// Cuando se insale el sw, se cree la cache
const CACHE_NAME = "V1_cache_comprando";
const urlsToCache = [
  "./",
  "./index.html",
  "./css/style.css",
  "./css/bootstrap.min.css",
  "./assets/icon/coffee-48.png",
  "./js/app.js",
];

self.addEventListener("install", function (evento) {
  console.log("Instalando SW");
  const cacheStatico = caches.open("statico-v1").then((cache) => {
    cache.addAll(urlsToCache);
  });
  // Cuando termine el evento
  evento.waitUntil(cacheStatico);
});

// Cuando este offline, se carga la cache y cuando no cargue de la web
self.addEventListener("fetch", function (evento) {
  //      console.log('Fetching', evento.request);
  const respuesta = fetch(evento.request).catch((error) => {
    console.log("Error en la petición");
    return caches.match(evento.request);
  });
  evento.respondWith(respuesta);
});

// 1. Estado: Instalacion, almacenar los archivo estaticos
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
      .catch((err) => {
        console.log("Error al Registrarse", err);
      })
  );
});

// 2. Estado Activo, Buscando los archivos del almacenado
self.addEventListener("active", (event) => {
  const cachelist = [CACHE_NAME];

  event.waitUntil(
    caches
      .keys()
      .then((cachesNames) => {
        cachesNames.map((cachesName) => {
          // Removero lo que no se necesita en cache
          if (cachelist.indexOf(cachesName) === -1) {
            return caches.delete(cachesName);
          }
        });
      })
      .then(() => self.clients.claim())
      .catch((err) => {
        console.log("Error al Registrarse", err);
      })
  );
});

// Cuando necesite recuperar los archivos
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((resp) => {
      if (resp) {
        return resp;
      }

      // Recuerar el actual
      return fetch(event.request);
    })
  );
});
