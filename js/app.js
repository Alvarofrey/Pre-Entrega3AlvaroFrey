/*
Objetivos de la tercer pre-entrega:
- Usar el DOM ✅
- Usar eventos ✅
- Usar storage ✅
- (Modo PRO) Simular una base de datos ✅
- (Modo DIOS) Hacer un buscador ✅
*/

// Esta clase va a simular una base de datos. Vamos a cargar todos los productos
// de nuestro e-commerce.
class BaseDeDatos {
  constructor() {
    this.productos = [];
    // Vamos a cargar todos los productos que tengamos
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

  agregarRegistro(id, nombre, precio, categoria, imagen) {
    const producto = new Producto(id, nombre, precio, categoria, imagen);
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

// Clase carrito
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
      // Agregar al carrito
      this.carrito.push({ ...producto, cantidad: 1 });
      localStorage.setItem("carrito", JSON.stringify(this.carrito));
    }
    this.listar();
  }

  quitar(id) {
    const indice = this.carrito.findIndex((producto) => producto.id === id);
    // Si la cantidad del producto es mayor a 1, le resto
    if (this.carrito[indice].cantidad > 1) {
      this.carrito[indice].cantidad--;
    } else {
      // Sino, lo borro del carrito
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
    // Botones de quitar
    const botonesQuitar = document.querySelectorAll(".btnQuitar");
    for (const boton of botonesQuitar) {
      boton.onclick = (event) => {
        event.preventDefault();
        this.quitar(Number(boton.dataset.id));
      };
    }
    // Actualizamos variables carrito
    spanCantidadProductos.innerText = this.totalProductos;
    spanTotalCarrito.innerText = this.total;
  }
}

// Clase molde para los productos
class Producto {
  constructor(id, nombre, precio, categoria, imagen = false) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.categoria = categoria;
    this.imagen = imagen;
  }
}

// Objeto de la base de datos
const bd = new BaseDeDatos();

// Elementos
const divProductos = document.querySelector("#productos");
const divCarrito = document.querySelector("#carrito");
const spanCantidadProductos = document.querySelector("#cantidadProductos");
const spanTotalCarrito = document.querySelector("#totalCarrito");
const formBuscar = document.querySelector("#formBuscar");
const inputBuscar = document.querySelector("#inputBuscar");

// Llamamos a la función
cargarProductos(bd.traerRegistros());

// Muestra los registros de la base de datos en nuestro HTML
function cargarProductos(productos) {
  divProductos.innerHTML = "";
  for (const producto of productos) {
    divProductos.innerHTML += `
        <div class="producto container">
            <h3>${producto.nombre}</h3>
            <p>$${producto.precio}</p>
            <h6>${producto.categoria}</h6>
            <img class="img" src="img/${producto.imagen}" />
            <p><a href="#" class="btnAgregar" data-id="${producto.id}">Agregar al carrito</a></p>
        </div>
    `;
  }
  // Botones de agregar al carrito
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

// Evento buscador
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

// Objeto carrito
const carrito = new Carrito();







