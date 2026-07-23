//creacion de menu de hotel "5 sonrisas"
let habitaciones = []; // arreglo de la variable habitaciones donde se almacena todos las caracteristicas del objeto habitacion.

function menu(){
    let opcion = prompt(                                        
        "************** Hotel 5 Sonrisas **************\n"+
        "1. Registrar nueva habitacion\n"+
        "2. Listar habitacion\n"+
        "3. Buscar habitacion por numero\n"+
        "4. Cambiar estado de la habitacion\n"+
        "5. Eliminar habitacion \n"+
        "6. Salir"
    )

    switch(opcion){
        case "1":
            registrar(menu);
            break;
        case "2":
            mostrar(menu);
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