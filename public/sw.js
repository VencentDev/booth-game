const CACHE_NAME = "matching-card-game-v2";

const PRECACHE_URLS = [
  "/",
  "/manifest.json",
  "/icons/icon.svg",
  "/icons/icon-192.svg",
  "/icons/icon-512.svg",
  "/icons/qb-logo.png",
  "/products/1.jpeg",
  "/products/2.jpeg",
  "/products/3.jpeg",
  "/products/4.jpeg",
  "/products/5.jpeg",
  "/products/6.jpeg",
  "/products/7.jpeg",
  "/products/8.jpeg",
  "/products/9.jpeg",
  "/products/10.jpeg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((cacheName) => cacheName !== CACHE_NAME)
            .map((cacheName) => caches.delete(cacheName))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") {
    return;
  }

  const requestUrl = new URL(request.url);

  if (requestUrl.origin !== self.location.origin) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request, "/"));
    return;
  }

  event.respondWith(cacheFirst(request));
});

self.addEventListener("message", (event) => {
  if (event.data?.type !== "CACHE_URLS" || !Array.isArray(event.data.urls)) {
    return;
  }

  event.waitUntil(cacheUrls(event.data.urls));
});

async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);

  if (cachedResponse) {
    return cachedResponse;
  }

  const networkResponse = await fetch(request);

  if (networkResponse.ok) {
    const cache = await caches.open(CACHE_NAME);
    cache.put(request, networkResponse.clone());
  }

  return networkResponse;
}

async function networkFirst(request, fallbackUrl) {
  try {
    const networkResponse = await fetch(request);

    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch {
    const cachedResponse = await caches.match(request);
    return cachedResponse ?? caches.match(fallbackUrl);
  }
}

async function cacheUrls(urls) {
  const cache = await caches.open(CACHE_NAME);
  const sameOriginUrls = urls.filter((url) => {
    try {
      return new URL(url, self.location.origin).origin === self.location.origin;
    } catch {
      return false;
    }
  });

  await Promise.allSettled(
    sameOriginUrls.map(async (url) => {
      const response = await fetch(url, { cache: "no-cache" });

      if (response.ok) {
        await cache.put(url, response);
      }
    })
  );
}
