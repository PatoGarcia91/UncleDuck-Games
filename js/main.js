const juegosContainer = document.getElementById("juegosContainer")
const carrito = []


let cuentaAcc = 0
let cuentaAve = 0
let cuentaDep = 0
let cuentaAll = 0
let cuentaCarro = 0

listadoJuegos.forEach((elm) => {

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
        <button class= "btnAgregar" onClick="agregarCarrito()">Agregar al carrito</button>

    </div>

    `
    //Contabilizo los juegos para el span de categorías
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

 //   console.log(document.getElementById("juegosContainer").lenght )

    juegosContainer.appendChild(div)
})


    const boton = document.querySelectorAll(".btn");
    const cards = document.querySelectorAll(".card");
    
    //Todavía no filtra del todo bien, se debe buscar todos y despues se elige la categoría y así
    function filter(catego) {
        for (let i = 0; i < cards.length; i++) {
          let card = cards[i];
          let cardCategory = card.querySelector("#category"); 
      
          //Si es todos, no hay hidden
          if (catego === "Todos") {
            card.classList.remove("hidden");
          } 
          //Si coincide boton y categoría, muestro solo categoria
          else if (cardCategory.innerHTML === catego) {
            card.classList.add("card"); 
          } else {
            //Pongo hidden las que no coinciden
            card.classList.add("hidden"); 
          }
          console.log(cardCategory);
          console.log(catego);
        //  console.log(cards)
        }
      }
    
    boton.forEach((boton) => {
      boton.addEventListener("click", () => {     
        const categoActual = boton.dataset.filter;
        filter(categoActual);
     //   console.log("categoActual " + categoActual);
      });
    });
     








let botonAgregar = document.querySelector('.btnAgregar');
botonAgregar.addEventListener('click', function() {
//    let id = this.dataset.id;
   // let nombre = nombre
 

    let nombre = this.closest('.card').querySelector('#name').textContent; 


    agregarCarrito(nombre, precio); 
});



//Agregar al carrito
function agregarCarrito(nombre, precio) {


    carrito.push(nombre, precio)
    
    cuentaCarro += 1;
    document.getElementById("spanCarro").innerHTML = cuentaCarro;

    console.log(carrito)

}