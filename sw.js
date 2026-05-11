self.addEventListener('install', (e) => {
  e.waitUntil(caches.open('game-store').then((cache) => cache.addAll([
    'index.html', 'game.js', 'manifest.json'
  ])));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then((response) => response || fetch(e.request)));
});
