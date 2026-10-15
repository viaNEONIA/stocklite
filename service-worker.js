const CACHE = 'stocklite-static-v1';
const ASSETS = ['./', './index.html', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png'];
self.addEventListener('install', event => {event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting()));});
self.addEventListener('activate', event => {event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('stocklite-static-') && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));});
self.addEventListener('fetch', event => {if(event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin)return;event.respondWith(fetch(event.request).then(response => {if(response.ok){const copy=response.clone();caches.open(CACHE).then(cache => cache.put(event.request,copy));}return response;}).catch(() => caches.match(event.request).then(cached => cached || caches.match('./index.html'))));});
