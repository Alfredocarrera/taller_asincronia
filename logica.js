//creacion de menu de hotel "5 sonrisas"
let habitaciones = []; // arreglo de la variable habitaciones donde se almacena todos las caracteristicas del objeto habitacion.

function menu(){
    let opcion = prompt(                                        
        "************** Hotel 5 Sonrisas **************\n"+
        "1. Registrar nueva habitacion\n"+
        "2. Listar habitacion\n"+
        "3. Buscar habitacion por numero\n"+
        "4. Cambiar estado de la habitacion\n"+
        "5. Eliminar habitacion\n"+
        "6. Salir"
    )

    switch(opcion){
        case "1":
            registrar(menu);
            console.log("ingrese datos...")
            break;
        case "2":
            listar(menu);
            break;
        case "3":
            buscar(menu);
            break;
        case "4":
            actualizar(menu);
            break;
        case "5":
            eliminar(menu);
            break;
        case "6":
            console.log("Saliendo....");
            break;
        default:
            console.log("Opción no válida!");
            menu();
    }
}


function registrar(callback){
    let numero = parseInt(prompt("numero de habitacion"));
    let tipo = prompt("tipo de habitacion(-Sencilla-Doble-Suite-)");
    let precioNoche = parseFloat(prompt("Precio por noche"));
    let estado = prompt("Estado de la habitacion)(-libre-Ocupada-Limpieza-)")
    let huesped = prompt("nombre del huesped");
    
    let habitacion = {
        numero,
        tipo,
        precioNoche,
        estado,
        huesped
    };

    console.log("validando informacion de la habitacion...");
    console.log(habitacion);
    setTimeout(function(){
        habitaciones.push(habitacion); //ingreso los elementos del diccionario habitacion en el arreglo habitaciones
        console.log("Habitacion registrada correctamente, "+numero, +huesped); // imprime datos de numero de habitacion y nombre del huesped que se registro
        callback(); // llamada en espera 
    }, 2000);
}

function listar(callback){
    console.log("========== Habitaciones =========");
    habitaciones.forEach(habitacion=> {
        console.log(`Numero de habitacion: ${habitacion.numero} | Tipo de habitacion: ${habitacion.tipo} | 
            Precio por noche ${habitacion.precioNoche} | Estado ${habitacion.estado} | Huesped ${habitacion.huesped}`);        
    });
    callback();
}
function buscar(callback){
    let num = prompt("Numero de habitacion a  buscar:");
    console.log("Buscando en la base de datos del hotel...")
    setTimeout(function(){
        let habBuscada = habitaciones.find(habitacion=>{
            return habitacion.numero === parseInt(num);
        });
        if (habBuscada){
            console.log("========== Habitacion Encontrada ==========");
            console.log(`Numero de habitacion: ${habBuscada.numero} | Tipo de habitacion: ${habBuscada.tipo} 
                | Precio de habitacion por noche: ${habBuscada.precioNoche} | Estado de la habitacion: ${habBuscada.estado} | 
                 Nombre del huesped: ${habBuscada.huesped}`);
        } else{
            console.log("Habitacion no encontrada...")
        }
        callback();
    }, 2000)
}
function actualizar(callback){
     let input = prompt("Numero de habitacion a actualizar:");

     if (!input){
        console.log("operacion cancelada.");
        if (typeof callback === "function") callback();
        return;
    }

    let num = parseInt(input,10);  //input es una variable que guarda el texto directo y el parametro 10 lo combierte en base decimal para que sea un numero como lo hace parseInt.
    console.log("Buscando en la base de datos del hotel...");

    setTimeout(function(){
        let habBuscada = habitaciones.find(function(habitacion) { //buscando habitacion
            return habitacion.numero === num;           
        });
        if (habBuscada){
            console.log(`Habitacion encontrada. Estado actual:  ${habBuscada.estado} `); // verificamos si existe hacemos cambios
            let nuevoEstado = prompt("Actualizar estado de habitacion (libre/limpieza): "); //solicitamos coloque nuevo estado de la habitacion
            if (nuevoEstado) {
                habBuscada.estado = nuevoEstado.trim();
                let estadoNuevo = habBuscada.estado.toLowerCase(); // El uso de .toLowerCase(). Convierte el texto a minúsculas.
                // Lógica según el estado ingresado
                if (estadoNuevo === "ocupado") {            //Si el estado es "ocupado", pediremos el nombre con un nuevo prompt y se lo asigna a habBuscada.huesped.
                    let nombreHuesped = prompt("Ingrese el nombre del huésped:");
                    habBuscada.huesped = nombreHuesped ? nombreHuesped.trim() : "Sin nombre";//Uso de .trim(): quita espacios extra.
                } else if (estadoNuevo === "libre") {  //Si el estado es "libre", asigna "Ninguno" (o "") a habBuscada.huesped.
                    habBuscada.huesped = "Ninguno"; // Limpiamos el nombre del huésped
                }

                console.log("========== Estado Actualizado ==========");
                console.log(`Habitación: ${habBuscada.numero} | Nuevo Estado: ${habBuscada.estado} | Huésped: ${habBuscada.huesped}`);
            } else {
                console.log("No se ingresó un estado válido.");
            }

        } else {
            console.log("Habitación no encontrada...");
        }

        // Executamos el callback
        if (typeof callback === "function") {
            callback();
        }
    }, 3000);
}
function eliminar(callback) {
    let input = prompt("Número de habitación a eliminar:");

    // Si el usuario cancela o deja el prompt vacío, regresamos de inmediato
    if (!input) {
        console.log("Operación cancelada.");
        if (typeof callback === "function") callback();
        return;
    }

    let num = parseInt(input, 10);

    // 1. Buscamos el índice de la habitación
    let posicion = habitaciones.findIndex(function(habitacion) {  //El método .findIndex() recorre el arreglo habitaciones elemento por elemento
        return habitacion.numero === num; //Si encuentra la habitación cuya propiedad numero sea igual a num, devuelve la posición del arreglo.
    });

    // 2. Verificamos si existe el elemento en el arreglo
    if (posicion !== -1) {
        // Guardamos los datos antes de borrar para mostrar el resultado
        let habitacionEliminada = habitaciones[posicion];

        // 3. Eliminamos el elemento en esa posición
        habitaciones.splice(posicion, 1);  //El método .splice(posicion, cantidad) modifica el arreglo original la cantidad 1 es el numero de elementos que quiero eliminar.
                                            // desde la posicion que encuentre.
        console.log("========== Habitación Eliminada ==========");
        console.log(`Se eliminó la habitación número ${habitacionEliminada.numero} (${habitacionEliminada.tipo}).`);
    } else {
        console.log("Habitación no encontrada. No se realizó ninguna eliminación.");
    }

    // 4. Volvemos al menú inmediatamente llamando al callback
    if (typeof callback === "function") {
        callback();
    }
}
menu();