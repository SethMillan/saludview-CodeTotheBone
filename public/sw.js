// Nombre de la caché
const CACHE_NAME = "mediview-cache-v1"

// Recursos que queremos cachear
const urlsToCache = [
  "/",
  "/home",
  "/offline.html",
  "/logo_pwa.png",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
]

// Instalar el service worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache")
      return cache.addAll(urlsToCache)
    }),
  )
})

// Activar el service worker
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME]
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName)
          }
          return null
        }),
      )
    }),
  )
})

// Interceptar las peticiones de red
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache hit - return response
      if (response) {
        return response
      }

      return fetch(event.request)
        .then((res) => {
          // Check if we received a valid response
          if (!res || res.status !== 200 || res.type !== "basic") {
            return res
          }

          // Clone the response
          const responseToCache = res.clone()

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache)
          })

          return res
        })
        .catch(() => {
          // Si la petición falla (sin conexión), mostrar la página offline
          if (event.request.mode === "navigate") {
            return caches.match("/offline.html")
          }

          // Para imágenes, mostrar una imagen de fallback
          if (event.request.destination === "image") {
            return caches.match("/placeholder.svg")
          }

          return new Response("Sin conexión")
        })
    }),
  )
})
