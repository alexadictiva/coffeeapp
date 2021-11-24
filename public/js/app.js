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
    suma: 0,
    url: "./local-api/localApi.json",
  },
  created: function () {
    this.fetchApi();
    this.mostrarCarrito();
    this.totalizar();
  },
  methods: {
    fetchApi: function () {
      fetch(this.url)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.products = data.results;
        })

        .catch((err) => console.error(err));
    },
    agregarCarrito: function (product, index) {
      console.log(index);
      console.log(
        "producto seleccionado: " + product.id + " " + product.nombre
      );
      this.carrito.push(product);
      localStorage.setItem("carrito", JSON.stringify(this.carrito));
    },
    mostrarCarrito: function () {
      let datos = JSON.parse(localStorage.getItem("carrito"));
      if (datos == null) {
        this.carrito = [];
      } else {
        this.carrito = datos;
      }
    },
    totalizar: function () {
      console.log("totalizar");
      let totalPrecios = this.carrito.reduce(
        (suma, valor) =>
          typeof valor.precio == "number" ? suma + valor.precio : suma,
        0
      );
      console.log(totalPrecios);
      this.suma = totalPrecios;
    },
    eliminarProducto: function (index) {
      this.carrito.splice(index, 1);
      localStorage.setItem("carrito", JSON.stringify(this.carrito));
    },
  },
});
