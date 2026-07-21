"use client";

import { useEffect } from "react";

export function ServiceWorkerRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV === "development" || !("serviceWorker" in navigator)) {
      return;
    }

    const registerServiceWorker = async () => {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js");
        const readyRegistration = await navigator.serviceWorker.ready;
        const worker = readyRegistration.active ?? registration.active;

        if (!worker) {
          return;
        }

        const loadedUrls = performance
          .getEntriesByType("resource")
          .map((entry) => entry.name)
          .filter((url) => url.startsWith(window.location.origin));

        worker.postMessage({
          type: "CACHE_URLS",
          urls: [window.location.href, ...loadedUrls]
        });
      } catch (error) {
        console.warn("Service worker registration failed.", error);
      }
    };

    void registerServiceWorker();
  }, []);

  return null;
}
