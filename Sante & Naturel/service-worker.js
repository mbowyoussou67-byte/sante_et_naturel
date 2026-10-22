const CACHE_NAME = 'sante-naturel-pwa-v18';
const RUNTIME_CACHE = 'sante-naturel-runtime-v1';
const APP_SHELL = [
    './index.html',
    './boutique.html',
    './catalogue.html',
    './produits.html',
    './apropos.html',
    './contact.html',
    './site-update-notice-v18.css',
    './site-update-notice-v18.js',
    './site.css?v=20261015-update-notification',
    './site.js?v=20261015-update-notification',
    './catalogue.js',
    './produits.json',
    './manifest.webmanifest',
    './icon-192.png',
    './icon-512.png',
    './sante-naturel-logo.jpg',
    './youssou-mbow.jpg',
    './ABSORBANT C.jpeg',
    './forever-absorbent-d.webp',
    './forever-argi-plus.jpg',
    './FOREVER CALCIUM.jpeg',
    './FOREVER BEE POLLEN.jpeg',
    './FOREVER MULTI-MACA.jpeg',
    './FOREVER BEE PROPOLIS.jpeg',
    './FOEVER LYCIUM PLUS.jpeg',
    './FOREVER AIL & THYM.jpeg',
    './VITOLIZ HOMME.jpeg',
    './ALEO BERRY NECTAR.jpeg',
    './aloe-vera-gel-forever.png',
    './boissons-aloe-forever.png',
    './aloe-soins-forever.png',
    './kit-visage-aloe-forever.jpeg',
    './soins-quotidiens-aloe-forever.jpeg',
    './aloe-ever-shield-forever.jpg',
    './aloe-avocado-soap-forever.jpg',
    './forever-bright-toothgel.jpg',
    './soins-visage-forever.jpg',
    './selection-hygiene-forever.jpg',
    './selection-protection-soins-forever.jpeg',
    './selection-nutrition-soins-forever.jpeg'
];
const EXTERNAL_ASSET_HOSTS = new Set([
    'cdn.tailwindcss.com',
    'cdnjs.cloudflare.com',
    'fonts.googleapis.com',
    'fonts.gstatic.com'
]);

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(APP_SHELL))
    );
});

self.addEventListener('message', (event) => {
    if (event.data?.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => Promise.all(cacheNames
                .filter((name) => name.startsWith('sante-naturel-') && name !== CACHE_NAME && name !== RUNTIME_CACHE)
                .map((name) => caches.delete(name))))
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    const request = event.request;
    if (request.method !== 'GET') return;

    const requestUrl = new URL(request.url);
    if (requestUrl.origin === self.location.origin && request.mode === 'navigate') {
        event.respondWith(
            fetch(request)
                .then((response) => {
                    if (response.ok) {
                        const copy = response.clone();
                        event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.put(request, copy)));
                    }
                    return response;
                })
                .catch(async () => {
                    const cachedPage = await caches.match(request, { ignoreSearch: true });
                    return cachedPage || caches.match('./index.html');
                })
        );
        return;
    }

    if (requestUrl.origin === self.location.origin && requestUrl.pathname.endsWith('/produits.json')) {
        event.respondWith(
            (async () => {
                const cache = await caches.open(CACHE_NAME);
                try {
                    const response = await fetch(new Request(request, { cache: 'no-cache' }));
                    if (response.ok) {
                        await cache.put(request, response.clone());
                    }
                    return response;
                } catch (error) {
                    const cachedResponse = await cache.match(request, { ignoreSearch: true });
                    if (cachedResponse) return cachedResponse;
                    throw error;
                }
            })()
        );
        return;
    }

    if (requestUrl.origin === self.location.origin) {
        event.respondWith(
            caches.match(request, { ignoreSearch: true }).then((cachedResponse) => cachedResponse || fetch(request))
        );
        return;
    }

    if (!EXTERNAL_ASSET_HOSTS.has(requestUrl.hostname)) return;

    event.respondWith(
        caches.open(RUNTIME_CACHE).then(async (cache) => {
            const cachedResponse = await cache.match(request);
            if (cachedResponse) return cachedResponse;

            const response = await fetch(request);
            if (response.ok || response.type === 'opaque') {
                event.waitUntil(cache.put(request, response.clone()));
            }
            return response;
        })
    );
});
