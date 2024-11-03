const juegosContainer = document.getElementById("juegosContainer")
const spanCateg = document.getElementsByTagName("span")
let carrito = JSON.parse(localStorage.getItem("carrito")) || []
let precio = 0
let precioTotal = 0
let cuentaCarro = 0
let modal = document.getElementById("ventanaModal");
let btnAbreModal = document.getElementById("btnCarrito");
let spanCerrarModal = document.getElementsByClassName("cerrar")[0];
let modalCarro = document.getElementById("modalCarro");
let carritoContainer = document.getElementById("carritoContainer");
const spanCarro = document.getElementById("spanCarro")





const cargoCatalogo = async() => {

  try{
    const response = await fetch("js/juegos.json")
    const data = await response.json()

    muestroCatalogo(data)
  }
  catch (error){
    console.error("Error al cargar juegos", error)
  }
}

const muestroCatalogo = (juegos) => {

  juegosContainer.innerHTML = ''
  spanCateg.innerHTML = ''

  let cuentaAcc = 0
  let cuentaAve = 0
  let cuentaDep = 0
  let cuentaAll = 0

  juegos.forEach((elm) => {
    const div = document.createElement("div")

    div.classList.add("card" )

    div.innerHTML = `

    <img src="${elm.imagen}" id="portada">
    <div class="card-body">
        <h5 class="card-title" id="name">${elm.nombre}</h5>
        <p class="card-text categ" id="category">${elm.categoria}</p>
    </div>
    <div class="card-footer">
        <small class="text-muted" id="price">$${elm.precio}</small>
        <button class= "btnAgregar" id="agregar${elm.id}">Agregar al carrito</button>

    </div>

    `
    juegosContainer.appendChild(div)

    //agrega al carrito y muestra Toastify
    const boton = document.getElementById(`agregar${elm.id}`)
    boton.addEventListener("click", () => {
      agregarCarrito(elm.id, juegos)
      actualizarCarrito();
        //  toast arriba a la derecha
        Toastify({
            text: `${elm.nombre} agregado al carrito`,
            gravity: "top",
            avatar: `${elm.imagen}`,
            style: {
              background: '#fafafa',
              color: '#13aefb',
              fontSize: 'large',
            }
        }).showToast();
    })
  // Carga los spans numéricos de cada categoría
  if (elm.categoria.includes("Accion")) {
      cuentaAcc += 1;
      cuentaAll += 1;
      document.getElementById("spanAcc").innerHTML = cuentaAcc;
      document.getElementById("spanAll").innerHTML = cuentaAll;
      
  }
  else if (elm.categoria.includes("Aventuras")) {
      cuentaAve += 1;
      cuentaAll += 1;
      document.getElementById("spanAve").innerHTML = cuentaAve;
      document.getElementById("spanAll").innerHTML = cuentaAll;

  }
  else if (elm.categoria.includes("Deportes")) {
      cuentaDep += 1;
      cuentaAll += 1;
      document.getElementById("spanDep").innerHTML = cuentaDep;
      document.getElementById("spanAll").innerHTML = cuentaAll;

  }

    
  })
}

//categorias
  const btnCateg = document.getElementsByClassName('catego')

  for (let boton of btnCateg) {

    boton.addEventListener('click', filtroCategoria)
  }

  function filtroCategoria(e){

    const id = e.target.dataset.id

//Si elijo Todos, muestra el listado completo (por defecto), sino, solo la categoría asociada
    if (id === 'todos'){
      muestroCategoria(listadoJuegos);
    }
    else{
      const juegosFiltrados = listadoJuegos.filter(p => p.categoria === id)
      muestroCategoria(juegosFiltrados)
    }

  }





//agrego o modifico cantidad de juegos
const agregarCarrito = (id, juegos) => {

  const juegoAgregado = juegos.find(juego => juego.id === id)
  spanCarro.innerHTML = ++cuentaCarro

  if (carrito.some(juego => juego.id === id)) {
      const index = carrito.findIndex(juego => juego.id === id)

      carrito[index].cantidad++
  } else {
    juegoAgregado.cantidad = 1

      carrito.push(juegoAgregado)
  }

  guardarLocalstorage()

}

const guardarLocalstorage = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito))
}





const cargarModalCarrito = () => {

  if (carrito.length > 0) {  
    actualizarCarrito()
  } 
  else {
    modalCarro.innerHTML = `
      <p>El carrito está vacío.</p>
      <img src="./images/logo/carro-vacio.jpg" alt="">
      `
  }
}


const actualizarCarrito = () => {
  carritoContainer.innerHTML = ""

  if (carrito.length === 0) {
    
    total.innerText = `Total: $0`;

    spanCarro.innerHTML = 0

    carritoContainer.innerHTML = `
      <h4>Todavía no elegiste nada?</h4> <br>
      <img src="./images/logo/carro-vacio.jpg" alt="" id="carroVacio">
      `
  } else {

      carrito.forEach(elm => {
          const div = document.createElement("div");
          // div.classList.add("producto");

          div.innerHTML = `
          <h3>${elm.nombre}</h3>
          <img src="${elm.imagen}" id="portadaCarro">
          <p>Precio: $${elm.precio}</p>
          <p ">Cantidad: ${elm.cantidad}</p>
          <button id="borrar${elm.id}">Borrar</button>
          <hr>
          `;
          carritoContainer.appendChild(div);

          const boton = document.getElementById(`borrar${elm.id}`)
          
          //si tiene más de una copia, lo borro de una, sino, derecho al splice
          boton.addEventListener("click", () => {
            if (elm.cantidad > 1){
              elm.cantidad --
              spanCarro.innerHTML = --cuentaCarro

            }
            else{
              borrarDelCarrito(elm.id);
            }

            actualizarCarrito();
              
          })
      })
   total.innerText = `Total: $${carrito.reduce((cuenta, juego) => cuenta + (juego.precio * juego.cantidad), 0)}`;
  }

}


const borrarDelCarrito = (id) => {

  const borrarUno = carrito.findIndex(juego => juego.id === id)

  carrito.splice(borrarUno, 1)
  
  spanCarro.innerHTML = --cuentaCarro

  guardarLocalstorage()
  actualizarCarrito();
}






// Abrir y cerrar modal
btnAbreModal.addEventListener("click",function() {
  modal.style.display = "block";
});
spanCerrarModal.addEventListener("click",function() {
  modal.style.display = "none";
});
window.addEventListener("click",function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

cargoCatalogo()
cargarModalCarrito()
