if (navigator.serviceWorker) {
  navigator.serviceWorker.register("/sw.js");
  console.log("Service Worker registrado");
}

var myModal = document.getElementById("myModal");
var myInput = document.getElementById("myInput");

var app = new Vue({
  el: "#app",
  data: {
    products: [],
    carrito: [],
    mensajePrueba: null,
    //url: "https://rickandmortyapi.com/api/character/",
    url: "./local-api/localApi.json",
  },
  methods: {
    fetchApi: function () {
      fetch(this.url)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          this.products = data.results;
        })

        .catch((err) => console.error(err));
    },
    agregarCarrito: function (product) {
      console.log(
        "producto seleccionado: " + product.id + " " + product.nombre
      );
      this.carrito.push(product);
      localStorage.setItem("carrito", JSON.stringify(this.carrito));
    },
    mostrarCarrito: function () {
      this.carrito = JSON.parse(localStorage.getItem("carrito"));
    },
  },
});

app.fetchApi();
app.mostrarCarrito();
