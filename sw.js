/* ==========================================================================
   BAMBOO CHICKEN SELECT — OFFICIAL SERVICE WORKER
   Android-First High Performance PWA Service Worker
   Offline Shell, Fast Cache, Network-First API Bypass
   Current Release: v1.1.0
   ========================================================================== */

const SW_VERSION = 'v1.1.0';
const CACHE_NAME = `bc-select-shell-${SW_VERSION}`;
const OFFLINE_URL = '/';

// Core shell assets to precache on install
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/app.js',
  '/manifest.webmanifest',
  '/manifest.json',
  '/icons/icon.svg',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/icon-maskable-512.png',
  '/icons/apple-touch-icon.png',
  '/favicon.png',
  '/favicon.svg'
];

// Install Event — precache the application shell safely
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.all(
        PRECACHE_ASSETS.map((url) => {
          return cache.add(url).catch((err) => {
            console.warn('[SW] Precache failed for', url, err);
          });
        })
      );
    })
  );
});

// Activate Event — cleanup outdated caches & claim clients
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            console.log('[SW] Purging outdated shell cache:', name);
            return caches.delete(name);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// Fetch Event — intelligent routing
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // 1. API Calls (Orders API, Worker endpoints, Analytics) -> NETWORK ONLY (Never cache stale mutations)
  if (
    url.hostname.includes('workers.dev') ||
    url.pathname.startsWith('/api/') ||
    request.method !== 'GET'
  ) {
    event.respondWith(
      fetch(request).catch(() => {
        // Return JSON error response if network is offline during an API call
        return new Response(
          JSON.stringify({
            ok: false,
            error: 'You appear to be offline. Please connect to the internet to complete your order.'
          }),
          {
            status: 503,
            statusText: 'Service Unavailable',
            headers: { 'Content-Type': 'application/json' }
          }
        );
      })
    );
    return;
  }

  // 2. Navigation Requests (HTML documents) -> Network First with Cache Fallback
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(async () => {
          const cachedResponse = await caches.match(request);
          if (cachedResponse) {
            return cachedResponse;
          }
          const offlineFallback = await caches.match(OFFLINE_URL);
          return offlineFallback || new Response('Bamboo Chicken Select is currently offline.', {
            headers: { 'Content-Type': 'text/plain' }
          });
        })
    );
    return;
  }

  // 3. Google Fonts (CSS & WOFF2) -> Cache First with Long Expiry
  if (
    url.hostname === 'fonts.googleapis.com' ||
    url.hostname === 'fonts.gstatic.com'
  ) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return networkResponse;
        });
      })
    );
    return;
  }

  // 4. Static App Shell Assets (CSS, JS, Icons, Images) -> Stale-While-Revalidate
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // Network failed, nothing to update in cache
        });

      return cachedResponse || fetchPromise;
    })
  );
});

// Allow client pages to trigger immediate activation
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
