// Nombre y versión del caché específico para el proyecto
const CACHE_NAME = 'v1_cache_jalpan_de_mi_corazon';
const urlsToCache = [
    './',
    './index.html',
    './css/styles.css',
    './js/script.js',
    './img/logo_corazon.png',
    './img/logo_jalpan.png',
    './img/fondo1.jpg',
    './img/fondo2.jpg',
    './img/fondo3.jpg',
    './img/pwa/32.png',
    'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css'
];

// Instalación: Almacenar recursos en caché
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
            .then(() => self.skipWaiting())
            .catch(err => console.log('❌ Falló el registro del caché:', err))
    );
});

// Activación: Limpiar cachés antiguos
self.addEventListener('activate', e => {
    const cacheWhitelist = [CACHE_NAME];

    e.waitUntil(
        caches.keys()
            .then(cacheNames => Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            ))
            .then(() => self.clients.claim())
    );
});

// Fetch: Estrategia "Cache First" con fallback a red
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
            .then(res => res || fetch(e.request).then(networkResponse => {
                // Opcional: Cachear respuestas dinámicas
                return caches.open(CACHE_NAME).then(cache => {
                    cache.put(e.request, networkResponse.clone());
                    return networkResponse;
                });
            }))
            .catch(() => {
                // Fallback offline (puedes personalizarlo)
                return caches.match('./index.html');
            })
    );
});