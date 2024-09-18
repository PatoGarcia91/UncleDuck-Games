alert("Bienvenidx a la plataforma de compra de videojuegos UncleDuck Games!")

do{
    usuario = prompt("Para continuar, por favor ingresa tu nombre")
}
while
    (usuario == "")
    
const carrito = []

function vistaPreliminar(){
    let total = 0
    let mensaje

    for (let juego of carrito) {
        mensaje = `Juego: ${juego.nombre}\nPrecio: $${juego.precio}\n`;

        total += juego.precio
    }

    alert(mensaje)

    alert("El precio total del carrito es: $" + total)
}



function coso() {
    let opciones
    
    class Juego{
        constructor(nombre, precio){
            this.nombre = nombre
            this.precio = parseInt(precio)
        }
        
    }

    do{
        opciones = prompt(`Seleccione el juego que desea comprar, para finalizar el proceso, escriba Terminar 
                                        1- "Assetto Corsa" 
                                        2- Days Gone 
                                        3- EA FC 24 
                                        4- Ghost of Tsushima 
                                        5- God of War 
                                        6- Grand Theft Auto V`).toLowerCase()
        
        console.log(opciones)

        switch (opciones) {
            case "1":
                carrito.push(new Juego("Assetto Corsa", 2000))
                break
            case "2":
                carrito.push(new Juego("Days Gone", 3000))
                break
             case "3":
                carrito.push(new Juego("EA FC 24", 4000))
                break   
            case "4":
                carrito.push(new Juego("Ghost of Tsushima", 5000))
                break
            case "5":
                carrito.push(new Juego("God of War", 6000))
                break
            case "6":
                carrito.push(new Juego("Grand Theft Auto V", 7000))
                break
            case "terminar":
                break
            default:
                alert("No es un juego elegible")
                break
        }
            

        console.log(carrito)

        vistaPreliminar()

        }
    while (opciones !== "terminar")

    if (confirm("Desea confirmar la compra?")){
        alert("Muchas gracias por su compra!")
    }
}
