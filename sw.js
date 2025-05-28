// Service Worker for Three Connect PWA
const CACHE_NAME = 'three-connect-v2';
const urlsToCache = [
  '/',
  '/css/performance-optimized.css',
  '/js/performance-main.js',
  '/js/performance-video-loader.js',
  '/images/logo.jpg',
  '/offline.html'
];

// Dynamic cache for runtime caching
const DYNAMIC_CACHE = 'three-connect-dynamic-v1';
const MAX_CACHE_SIZE = 50;

// Install Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Cache and return requests
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Clone the request
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(response => {
          // Check if valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Don't cache videos, large files, or non-GET requests
          if (event.request.method !== 'GET') {
            return response;
          }

          const contentType = response.headers.get('content-type');
          if (contentType && (contentType.includes('video') || contentType.includes('audio'))) {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          // Add to dynamic cache
          caches.open(DYNAMIC_CACHE)
            .then(cache => {
              cache.put(event.request, responseToCache);
              // Limit cache size
              limitCacheSize(DYNAMIC_CACHE, MAX_CACHE_SIZE);
            });

          return response;
        }).catch(() => {
          // Offline fallback for navigation requests
          if (event.request.mode === 'navigate') {
            return caches.match('/offline.html');
          }
          // Return cached version if available
          return caches.match(event.request);
        });
      })
      .catch(() => {
        // Return offline page
        return caches.match('/offline.html');
      })
  );
});

// Update Service Worker
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME, DYNAMIC_CACHE];
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Limit cache size
function limitCacheSize(name, size) {
  caches.open(name).then(cache => {
    cache.keys().then(keys => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
}

// Background Sync for form submissions
self.addEventListener('sync', event => {
  if (event.tag === 'contact-form') {
    event.waitUntil(syncContactForm());
  }
});

async function syncContactForm() {
  const cache = await caches.open('form-submissions');
  const requests = await cache.keys();
  
  for (const request of requests) {
    try {
      const response = await fetch(request);
      if (response.ok) {
        await cache.delete(request);
      }
    } catch (error) {
      console.error('Sync failed:', error);
    }
  }
}

// Push Notifications
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'Neue Nachricht von Three Connect!',
    icon: '/images/icon-192x192.png',
    badge: '/images/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Zur Website',
        icon: '/images/checkmark.png'
      },
      {
        action: 'close',
        title: 'Schließen',
        icon: '/images/xmark.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Three Connect', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  if (event.action === 'explore') {
    clients.openWindow('https://three-connect.de');
  }
});