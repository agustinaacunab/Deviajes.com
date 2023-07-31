let productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito"));
//productosEnCarrito = JSON.parse (productosEnCarrito);

const contenedorCarritoVacio = document.querySelector("#emptyBag");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#acciones-carrito");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-acciones-left");
const botonVaciar = document.querySelector("#carrito-acciones-left");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");

function CargarProductosCarrito (){
    if (productosEnCarrito && productosEnCarrito.length > 0){

        

        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    
        contenedorCarritoProductos.innerHTML = "";
    
        productosEnCarrito.forEach(producto =>{
    
        const div = document.createElement("div");
        div.classList.add("carrito-producto");
        div.innerHTML = `
        <img class="carrito-producto-img" src="${producto.img}" alt="${producto.titulo}">
        <div class="carrito-prod-titulo">
            <small>Titulo</small>
            <h3>${producto.titulo}</h3>
        </div>
            <div class="carrito-prod-cantidad">
            <small>Cantidad</small>
            <p>${producto.cantidad}</p>
        </div>
        <div class="carrito-prod-price">
            <small>Precio</small>
            <p>${producto.precio}</p>
        </div>
            <div class="carrito-prod-subtotal">
            <small>Subtotal</small>
            <p>${producto.precio * producto.cantidad}</p>
        </div>
            <button class="carrito-prod-eliminar" id= "${producto.id}"><i class="bi bi-trash3"></i></button>
        `;
    
        contenedorCarritoProductos.append(div);
    
    })
    
    actualizarBotonesEliminar();
    actualizarTotal();

    }else{
    
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    
    
    }
    
}

CargarProductosCarrito ();



function actualizarBotonesEliminar(){
    botonesEliminar = document.querySelectorAll(".carrito-prod-eliminar");

    botonesEliminar.forEach(boton =>{
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito (e){
    Toastify({
        text: "Producto eliminado correctamente",
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
    let idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);

    productosEnCarrito.splice(index,1);
    CargarProductosCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

    
}

botonVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito (){
    Swal.fire({
        title: '<strong>Oye...</strong>',
        icon: 'question',
        html:
          'de verdad quieres <b>vaciar el carrito?</b> ',
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:
    '<i class="fa fa-thumbs-up"></i> si, quiero cancelar mi compra',
  cancelButtonText:
    '<i class="fa fa-thumbs-down"></i> No, vamos a seguir comprando',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            productosEnCarrito.length = 0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
            CargarProductosCarrito();
        } 
      })
}

function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
}

botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Tu compra ha sido realizada con exito! en breve recibiras un email con los detalles',
        showConfirmButton: false,
        timer: 1500
      })

    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");

}