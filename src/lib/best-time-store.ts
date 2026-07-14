const DB_NAME = "matching-card-game";
const STORE_NAME = "records";
const BEST_SOLVE_KEY = "bestSolveMs";
const DB_VERSION = 1;

function hasIndexedDb(): boolean {
  return typeof indexedDB !== "undefined";
}

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (!hasIndexedDb()) {
      reject(new Error("IndexedDB is unavailable"));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function readValue(db: IDBDatabase): Promise<number | null> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(BEST_SOLVE_KEY);

    request.onsuccess = () => {
      resolve(typeof request.result === "number" ? request.result : null);
    };
    request.onerror = () => reject(request.error);
  });
}

function writeValue(db: IDBDatabase, ms: number): Promise<void> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put(ms, BEST_SOLVE_KEY);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function getBestSolveTime(): Promise<number | null> {
  let db: IDBDatabase | null = null;

  try {
    db = await openDatabase();
    return await readValue(db);
  } catch {
    return null;
  } finally {
    db?.close();
  }
}

export async function saveBestSolveTime(ms: number): Promise<void> {
  let db: IDBDatabase | null = null;

  try {
    db = await openDatabase();
    const existing = await readValue(db);
    if (existing === null || ms < existing) {
      await writeValue(db, ms);
    }
  } catch {
    return;
  } finally {
    db?.close();
  }
}
