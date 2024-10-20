const juegosContainer = document.getElementById("juegosContainer")
const spanCateg = document.getElementsByTagName("span")
const carrito = []
let precio = 0
let precioTotal = 0
let cuentaCarro = 0

//Genera el listado de juegos en pantalla
  function muestroCategoria(juegos){

    juegosContainer.innerHTML = ''
    spanCateg.innerHTML = ''

    let cuentaAcc = 0
    let cuentaAve = 0
    let cuentaDep = 0
    let cuentaAll = 0

    juegos.forEach((elm) =>{

      const div = document.createElement("div")

      div.classList.add("card" )

      div.innerHTML = `

      <img src="${elm.imagen}" id="pic">
      <div class="card-body">
          <h5 class="card-title" id="name">${elm.nombre}</h5>
          <p class="card-text categ" id="category">${elm.categoria}</p>
      </div>
      <div class="card-footer">
          <small class="text-muted" id="price">$${elm.precio}</small>
          <button class= "btnAgregar" id=${elm.id}  data-id =${elm.id}>Agregar al carrito</button>

      </div>

      `
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

      juegosContainer.appendChild(div)

    }
  )

  }

  muestroCategoria(listadoJuegos);

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

  //Agregar al carrito - event listener
  const botonAgregar = document.querySelectorAll('.btnAgregar');
  botonAgregar.forEach(el => {
    el.addEventListener('click', (e) =>{
      agregarCarrito(e.target.id)
    });
  })
  console.log(botonAgregar);



//Agregar al carrito
  function agregarCarrito(id) {

    const agregado = carrito.some(juego => juego.id === parseInt(id))

    let juego = listadoJuegos.find(juego => juego.id === parseInt(id))

    if (!agregado){

      carrito.push(juego)
      
      carritoContainer.innerHTML = ''

      carrito.forEach((elm) =>{

        const div = document.createElement("div")

        div.innerHTML = `
          <p class="card-text categ" id="carroCateg">${elm.nombre}</p>
          <small class="text-muted" id="carroPrecio">$${elm.precio}</small>
        `
        carritoContainer.appendChild(div)

      }
    )

    }

    precio = precio + parseInt(juego.precio)
    document.getElementById("total").innerHTML = "Total: $"+precio
    cuentaCarro = cuentaCarro + 1
    document.getElementById("cantidad").innerHTML = "Cantidad: " + cuentaCarro
    
  }