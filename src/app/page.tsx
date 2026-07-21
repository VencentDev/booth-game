"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { GameBoard } from "@/components/game-board";
import { GameControls } from "@/components/game-controls";
import { GameHud } from "@/components/game-hud";
import { createDeck, type Card } from "@/lib/deck";
import { formatElapsed } from "@/lib/format";
import { getBestSolveTime, saveBestSolveTime } from "@/lib/best-time-store";
import {
  createRoundStartedAt,
  getSecondsRemaining,
  ROUND_SECONDS,
  startRoundAt
} from "@/lib/round-clock";

const MISMATCH_DELAY_MS = 760;
const MATCH_SETTLE_MS = 220;

type GameStatus = "playing" | "won" | "lost" | "gave-up";

function createRound() {
  return {
    deck: createDeck(),
    matchedIds: new Set<string>(),
    selectedIds: [] as string[],
    moves: 0,
    secondsRemaining: ROUND_SECONDS,
    status: "playing" as GameStatus,
    startedAt: createRoundStartedAt(),
    solvedMs: null as number | null,
    isLocked: false
  };
}

export default function Home() {
  const [deck, setDeck] = useState<Card[]>(() => createDeck(() => 0.5));
  const [matchedIds, setMatchedIds] = useState<Set<string>>(new Set());
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(ROUND_SECONDS);
  const [status, setStatus] = useState<GameStatus>("playing");
  const [startedAt, setStartedAt] = useState<number | null>(() => createRoundStartedAt());
  const [solvedMs, setSolvedMs] = useState<number | null>(null);
  const [bestSolveMs, setBestSolveMs] = useState<number | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const timersRef = useRef<number[]>([]);

  const clearPendingTimers = useCallback(() => {
    for (const timer of timersRef.current) {
      window.clearTimeout(timer);
    }
    timersRef.current = [];
  }, []);

  const resetRound = useCallback(() => {
    clearPendingTimers();
    const round = createRound();
    setDeck(round.deck);
    setMatchedIds(round.matchedIds);
    setSelectedIds(round.selectedIds);
    setMoves(round.moves);
    setSecondsRemaining(round.secondsRemaining);
    setStatus(round.status);
    setStartedAt(round.startedAt);
    setSolvedMs(round.solvedMs);
    setIsLocked(round.isLocked);
  }, [clearPendingTimers]);

  useEffect(() => {
    void getBestSolveTime().then(setBestSolveMs);

    return () => clearPendingTimers();
  }, [clearPendingTimers]);

  useEffect(() => {
    if (status !== "playing" || startedAt === null) {
      return;
    }

    const interval = window.setInterval(() => {
      const nextRemaining = getSecondsRemaining(startedAt, Date.now());
      setSecondsRemaining(nextRemaining);

      if (nextRemaining === 0) {
        setStatus("lost");
        setSelectedIds([]);
        setIsLocked(false);
      }
    }, 250);

    return () => window.clearInterval(interval);
  }, [startedAt, status]);

  const finishWin = useCallback(
    (nextMatchedIds: Set<string>) => {
      const finishedAt = Date.now();
      const elapsed = finishedAt - (startedAt ?? finishedAt);
      setMatchedIds(nextMatchedIds);
      setSelectedIds([]);
      setSolvedMs(elapsed);
      setStatus("won");
      setIsLocked(false);
      setBestSolveMs((currentBest) => {
        if (currentBest === null || elapsed < currentBest) {
          void saveBestSolveTime(elapsed);
          return elapsed;
        }

        return currentBest;
      });
    },
    [startedAt]
  );

  const handleCardClick = useCallback(
    (id: string) => {
      if (status !== "playing" || isLocked) {
        return;
      }

      if (matchedIds.has(id) || selectedIds.includes(id)) {
        return;
      }

      if (startedAt === null) {
        setStartedAt(startRoundAt(Date.now()));
      }

      const nextSelectedIds = [...selectedIds, id];
      setSelectedIds(nextSelectedIds);

      if (nextSelectedIds.length < 2) {
        return;
      }

      setMoves((currentMoves) => currentMoves + 1);
      setIsLocked(true);

      const [firstId, secondId] = nextSelectedIds;
      const firstCard = deck.find((card) => card.id === firstId);
      const secondCard = deck.find((card) => card.id === secondId);

      if (!firstCard || !secondCard) {
        setSelectedIds([]);
        setIsLocked(false);
        return;
      }

      if (firstCard.pairId === secondCard.pairId) {
        const timer = window.setTimeout(() => {
          const nextMatchedIds = new Set(matchedIds);
          nextMatchedIds.add(firstId);
          nextMatchedIds.add(secondId);

          if (nextMatchedIds.size === deck.length) {
            finishWin(nextMatchedIds);
            return;
          }

          setMatchedIds(nextMatchedIds);
          setSelectedIds([]);
          setIsLocked(false);
        }, MATCH_SETTLE_MS);

        timersRef.current.push(timer);
        return;
      }

      const timer = window.setTimeout(() => {
        setSelectedIds([]);
        setIsLocked(false);
      }, MISMATCH_DELAY_MS);

      timersRef.current.push(timer);
    },
    [deck, finishWin, isLocked, matchedIds, selectedIds, startedAt, status]
  );

  const handleGiveUp = useCallback(() => {
    if (status !== "playing") {
      return;
    }

    clearPendingTimers();
    setSelectedIds([]);
    setIsLocked(false);
    setStatus("gave-up");
  }, [clearPendingTimers, status]);

  const revealedIds = useMemo(() => {
    if (status === "gave-up" || status === "lost") {
      return new Set(deck.map((card) => card.id));
    }

    return new Set([...matchedIds, ...selectedIds]);
  }, [deck, matchedIds, selectedIds, status]);

  const statusText = useMemo(() => {
    if (status === "won") {
      return `Solved in ${formatElapsed(solvedMs)}.`;
    }

    if (status === "lost") {
      return "Time is up. Restart for a fresh board.";
    }

    if (status === "gave-up") {
      return "Round ended. The board is revealed.";
    }

    if (selectedIds.length === 1) {
      return "Pick the matching card.";
    }

    return "Find all 10 pairs before time runs out.";
  }, [selectedIds.length, solvedMs, status]);

  return (
    <main className="app-shell">
      <div className="game-frame">
        <div className="top-row">
          <div className="brand-panel" aria-label="QB Match">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="brand-mark" src="/icons/qb-logo.png" alt="" />
            <div className="brand-copy">
              <span className="brand-title">
                QB <strong>Match</strong>
              </span>
              <span className="brand-subtitle">Memory sprint</span>
            </div>
          </div>
          <GameHud
            bestSolveMs={bestSolveMs}
            matches={matchedIds.size / 2}
            moves={moves}
            timeRemaining={secondsRemaining}
            totalPairs={deck.length / 2}
          />
          <GameControls
            giveUpDisabled={status !== "playing"}
            onGiveUp={handleGiveUp}
            onRestart={resetRound}
          />
        </div>

        <GameBoard
          cards={deck}
          disabled={status !== "playing" || isLocked}
          matchedIds={matchedIds}
          onCardClick={handleCardClick}
          revealedIds={revealedIds}
          selectedIds={selectedIds}
        />

        <p className={`status-line status-${status}`}>{statusText}</p>
      </div>
    </main>
  );
}
