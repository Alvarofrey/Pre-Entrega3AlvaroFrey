class BaseDeDatos {
  constructor() {
    this.productos = [];
    this.agregarRegistro(1, "Tododia Jabon", 1730, "5u, Ciruela y Flor de Vanilla", "jabonciruela.png");
    this.agregarRegistro(2, "Tododia Jabon", 1990, "4u, Mandarina y Frambuesa", "jabonfeliz.png");
    this.agregarRegistro(3, "Tododia Anti-Transpirante Desodorante", 820, "Invisible,Avellana", "antiavellana.png");
    this.agregarRegistro(4, "Kaiak Perfume Femenino", 8500, "100ml, Moderada Citrica Rosa", "kaiakfem.png");
    this.agregarRegistro(5, "Kaiak Perfume Aventura Femenino", 8000, "100ml,,Jazmin", "coloniaaguas.png");
    this.agregarRegistro(7, "Ekos Perfume Maracuyà", 5500, "150ml,Leve,Cedro,Frutal", "ekosmaracuyá.png");
    this.agregarRegistro(8, "Tododia Body Splash", 5500, "200ml, Leve Fresca Limon Flores", "bodysplashlimon.png");
    this.agregarRegistro(9, "Tododia Crema Corporal", 3430, "400ml,Nuez Pecan Cacao Linaza,Prebiotico", "cremanuez.png");
    this.agregarRegistro(10, "Tododia Crema Pies", 1370, "50ml,Cacao Linaza,Limon,", "cremapieslimon.png");
    this.agregarRegistro(11, "Ekos Crema Manos", 1400, "40g,Hidrata y Regenera la Piel,Aroma Pitanga Preta", "cremaekospitanga.png");
    this.agregarRegistro(12, "Ekos Crema Manos", 1400, "40g,Hidrata y Regenera la Piel De las Manos e Uñas,Aroma Castañas ", "cremaekoscastanha.png");
    this.agregarRegistro(13, "Ekos Crema Manos", 1400, "40mg,Hidrata y Regenera la Piel De las Manos Aroma Ish Pink", "cremasekosishpink.png");
    this.agregarRegistro(14, "Lumina Shampoo", 1250, "300ml,Repuesto,Lisos Naturales,Purifica", "luminashampoo.png");
    this.agregarRegistro(15, "Plant Acondicionador", 1200, "300ml,Repuesto de Acondicionador, Liso y Suelto ,Queratina Vegetal", "plantlisos.png");
    this.agregarRegistro(16, "Plant Acondicionador", 1200, "300ml,Repuesto de Acondicionador, Revitalizacion Post-Quimica, Aceite de Nuez Pecan", "plantrevita.png");
    this.agregarRegistro(17, "Plant Acondicionador", 1200, "300ml,Repuesto de Acondicionador, Hidrataciòn Reparadora, BioaminoÀcidos de Quinoa", "planthidratacion.png");

  }

  agregarRegistro(id, nombre, precio, descripcion, imagen) {
    const producto = new Producto(id, nombre, precio, descripcion, imagen);
    this.productos.push(producto);
  }

  traerRegistros() {
    return this.productos;
  }

  registroPorId(id) {
    return this.productos.find((producto) => producto.id === id);
  }

  registrosPorNombre(palabra) {
    return this.productos.filter((producto) => producto.nombre.toLowerCase().includes(palabra));
  }
}


class Carrito {
  constructor() {
    const carritoStorage = JSON.parse(localStorage.getItem("carrito"));
    this.carrito = carritoStorage || [];
    this.total = 0;
    this.totalProductos = 0;
    this.listar();
  }

  estaEnCarrito({ id }) {
    return this.carrito.find((producto) => producto.id === id);
  }

  agregar(producto) {
    let productoEnCarrito = this.estaEnCarrito(producto);
    if (productoEnCarrito) {
      // Sumar cantidad
      productoEnCarrito.cantidad++;
    } else {
      this.carrito.push({ ...producto, cantidad: 1 });
      localStorage.setItem("carrito", JSON.stringify(this.carrito));
    }
    this.listar();
  }

  quitar(id) {
    const indice = this.carrito.findIndex((producto) => producto.id === id);
    if (this.carrito[indice].cantidad > 1) {
      this.carrito[indice].cantidad--;
    } else {
      this.carrito.splice(indice, 1);
    }
    localStorage.setItem("carrito", JSON.stringify(this.carrito));
    this.listar();
  }

  listar() {
    this.total = 0;
    this.totalProductos = 0;
    divCarrito.innerHTML = "";
    for (const producto of this.carrito) {
      divCarrito.innerHTML += `
      <div class="lista_carrito">
            <h6>${producto.nombre}</h6>
            <p>$${producto.precio}</p>
            <p>Cantidad: ${producto.cantidad}</p>
            <a href="#" data-id="${producto.id}" class="btnQuitar">Quitar</a>
        </div>
    `;
      this.total += producto.precio * producto.cantidad;
      this.totalProductos += producto.cantidad;
    }
    const botonesQuitar = document.querySelectorAll(".btnQuitar");
    for (const boton of botonesQuitar) {
      boton.onclick = (event) => {
        event.preventDefault();
        this.quitar(Number(boton.dataset.id));
      };
    }
    spanCantidadProductos.innerText = this.totalProductos;
    spanTotalCarrito.innerText = this.total;
  }
}

class Producto {
  constructor(id, nombre, precio, descripcion, imagen = false) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.descripcion = descripcion;
    this.imagen = imagen;
  }
}


const bd = new BaseDeDatos();


const divProductos = document.querySelector("#productos");
const divCarrito = document.querySelector("#carrito");
const spanCantidadProductos = document.querySelector("#cantidadProductos");
const spanTotalCarrito = document.querySelector("#totalCarrito");
const formBuscar = document.querySelector("#formBuscar");
const inputBuscar = document.querySelector("#inputBuscar");


cargarProductos(bd.traerRegistros());
function cargarProductos(productos) {
  divProductos.innerHTML = "";
  for (const producto of productos) {
    divProductos.innerHTML += `
        <div class="producto container">
            <h3>${producto.nombre}</h3>
            <p>$${producto.precio}</p>
            <h6>${producto.descripcion}</h6>
            <img class="img" src="img/${producto.imagen}" />
            <p><a href="#" class="btnAgregar" data-id="${producto.id}">Agregar al carrito</a></p>
        </div>
    `;
  }
  const botonesAgregar = document.querySelectorAll(".btnAgregar");
  for (const boton of botonesAgregar) {
    boton.addEventListener("click", (event) => {
      event.preventDefault();
      const id = Number(boton.dataset.id);
      const producto = bd.registroPorId(id);
      carrito.agregar(producto);
    });
  }
}
formBuscar.addEventListener("submit", (event) => {
  event.preventDefault();
  const palabra = inputBuscar.value;
  cargarProductos(bd.registrosPorNombre(palabra.toLowerCase()));
});
inputBuscar.addEventListener("keyup", (event) => {
  event.preventDefault();
  const palabra = inputBuscar.value;
  cargarProductos(bd.registrosPorNombre(palabra.toLowerCase()));
});

const carrito = new Carrito();







