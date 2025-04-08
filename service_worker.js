// service-worker.js

const CACHE_NAME = "v1-gamingwebsite";
const urlsToCache = [
  "/gamingwebsite/", // root
  "/gamingwebsite/index.html",
  "/gamingwebsite/styles.css",     // replace with your actual CSS file
  "/gamingwebsite/script.js",      // replace with your actual JS file
  "/gamingwebsite/logo.png",       // any images you use
  // Add more assets as needed
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(event.request).catch(() =>
          caches.match("/gamingwebsite/offline.html") // optional offline fallback
        )
      );
    })
  );
});

self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});