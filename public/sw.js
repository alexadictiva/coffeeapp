// Cuando se insale el sw, se cree la cache
const urlsToCache = [
  "./",
  "./index.html",
  "./css/style.css",
  "./css/bootstrap.min.css",
  "./assets/icon/coffee-48.png",
  "./js/vue.js",
  "./js/app.js",
  "./local-api/localApi.json",
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
