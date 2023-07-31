let productos = [ ];
fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    })



const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".btn-categoria");
const tituloPrincipal= document.querySelector("#tituloPrincipal");
let botonesAgregar = document.querySelectorAll(".addProduct");
const numerito = document.querySelector("#numerito");


function cargarProductos(productosElegidos){
    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");

        div.classList.add("producto");

        div.innerHTML = `
        <img class="img-products" src="${producto.img}" alt="${producto.titulo}">
        <div class="detail-prod">
          <h3 class="producto-titulo">${producto.titulo}</h3>
          <p class="producto-precio">${producto.precio}</p>
          <button class="addProduct" id="${producto.id}" >lo quiero</button>
        </div>
        `;
        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
    
}

cargarProductos(productos);

botonesCategorias.forEach(boton =>{

    boton.addEventListener("click",(e) =>{

        botonesCategorias.forEach(boton => boton.classList.remove("active"));

        e.currentTarget.classList.add("active");

         if(e.currentTarget.id != "todos"){

            const productoCategoria = productos.find (producto => producto.categoria.id === e.currentTarget.id);

            tituloPrincipal.innerText = productoCategoria.categoria.nombre;

        const productosBoton = productos.filter(producto=> producto.categoria.id === e.currentTarget.id);

        cargarProductos(productosBoton);

         }else{
            tituloPrincipal.innerText = "todos los productos";
            cargarProductos(productos);
         }
    })
});

function actualizarBotonesAgregar(){
    botonesAgregar = document.querySelectorAll(".addProduct");

    botonesAgregar.forEach(boton =>{
        boton.addEventListener("click", agregarAlCarrito);
    });
}
let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");


if (productosEnCarritoLS){

    productosEnCarrito = JSON.parse (productosEnCarritoLS);
    actualizarNumerito();

}else{

    productosEnCarrito = [];
}
 

function agregarAlCarrito(e){
    Toastify({
        text: "Producto agregado correctamente",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, pink, orange)",
          borderRadius : "2rem",
        },
        onClick: function(){} // Callback after click
      }).showToast();

         const idBoton = e.currentTarget.id;
         const productoAdded = productos.find(producto => producto.id === idBoton);

         if (productosEnCarrito.some(producto => producto.id === idBoton)) {
            const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
            productosEnCarrito[index].cantidad++;
         }else {
        productoAdded.cantidad = 1;
         productosEnCarrito.push(productoAdded);
        }
        actualizarNumerito();
       
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}

