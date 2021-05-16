// sw.js - Service Worker

// You will need 3 event listeners:
//   - One for installation
//   - One for activation ( check out MDN's clients.claim() for this step )
//   - One for fetch requests


const CACHE_NAME = 'lab7-site-cache';
let urlsToCache = [
    '/',
    '/index.html',
    'style.css',
    'settings.svg',
    'components/entry-page.js',
    'components/journal-entry.js',
    'scripts/router.js',
    'scripts/script.js',
    'https://cse110lab6.herokuapp.com/entries'
];
// const urlsToCache = ['https://cse110lab6.herokuapp.com/entries'];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Cache opened');
                return cache.addAll(urlsToCache);
            })
    );
});


self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if(response) {
                    console.log('Cache hit!');
                    return response;
                }

                console.log('Cache miss.');
                return fetch(event.request);
                    // .then((response) => {
                    //     caches.open(CACHE_NAME)
                    //         .then((cache) => {
                    //             cache.put(event.request, response.clone());
                    //         });
                    // });
            })
    );
});

self.addEventListener('activate', (event) => {
    console.log('claimed');
    event.waitUntil(self.clients.claim());
});

