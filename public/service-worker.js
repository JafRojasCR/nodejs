const CACHE_NAME = 'mi-pwa-cache-v1';
const urlsToCache = [
  '/', // o tu start_url
  '/login.html',
  '/camiseta.html',
  '/registro.html',
  '/votaciones.html',
  '/css/loginreg.css',
  '/css/camiseta.css',
  '/css/header.css',
  '/js/redirect.js',
  '/manifest.json', // Asegúrate de tener un manifest.json
];
// Evento 'install': se dispara cuando el service worker es instalado
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caché abierto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento 'fetch': intercepta peticiones de la red
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Devuelve el recurso de la caché si está disponible
        if (response) {
          return response;
        }
        // Si no está en la caché, continúa con la petición de red
        return fetch(event.request);
      })
  );
});