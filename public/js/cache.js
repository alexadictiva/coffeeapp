if (window.caches) {
  caches.open("cache-v1").then(function (cache) {
    cache.addAll([
      "./",
      "./index.html",
      "./css/style.css",
      "./css/bootstrap.min.css",
      "./assets/icon/coffee-48.png",
      "./js/vue.js",
      "./js/app.js",
      "./local-api/localApi.json",
    ]);

    cache.match("/index.html").then(function (response) {
      console.log(response);
      response.text().then(function (text) {
        console.log(text);
      });
    });
  });

  // Verificar si existe una cache
  caches.has("cache-v1").then(function (cache) {
    console.log("cache", cache);
  });

  // Eliminar una cache
  caches.delete("cache-v2").then(function () {
    console.log("cache borrado");
  });
} else {
  console.log("no cache, error");
}
