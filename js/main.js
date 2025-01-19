import {actualizarNombreDelProyecto,copiarCodigo} from './instalacion_proyecto.js';
import { cargarArchivo, crearMigracion, llenarRestricciones, cambiarNombre, seleccionarRestricciones, estadoRelaciones, actualizarContenidoSeleccionado, copiar_tabla_nombre, manejarMigraciones  } from './estructuracion_proyecto.js';
import {handleDownloadClick} from './lecturaService.js';
export const d=document;

d.addEventListener("DOMContentLoaded", () => {
    const projectName = localStorage.getItem("nombreProyecto");
    
    if (projectName === null) {
        console.log("nombreProyecto no está en localStorage");
    } else {
        console.log("Valor de nombreProyecto:", projectName);
    }
    
});

// Cargar componentes modulares
$(function(){
    $("#sidebar").load("../componentes/sidebar.html");
});

// Función para cargar el contenido dinámico
function cargarContenidoDesdeHash() {
    const hash = window.location.hash.substring(1); // Eliminar el '#' del hash
    const contenedor = d.getElementById("main-content"); // Contenedor principal
    if (!contenedor) return;

    // Verificar qué hash está presente y cargar el archivo correspondiente
    switch (hash) {
        case "configuracion_proyecto":
            $("#main-content").load("../componentes/configuracion_proyecto.html");
            break;
        case "instalacion_proyecto":
            $("#main-content").load("../componentes/instalacion_proyecto.html", function() {
                actualizarNombreDelProyecto();
                copiarCodigo();
            });
            break;
        case "estructuracion_proyecto":
            $("#main-content").load("../componentes/estructuracion_proyecto.html", function() {
                cargarArchivo();
                // Ejemplo de uso
                d.getElementById("copyButton").addEventListener("click",crearMigracion);
                const choicesInstances = [];

                d.querySelectorAll('.choices-multiple-remove').forEach(selectElement => {
                    const instance = new Choices(selectElement, { 
                        removeItemButton: true 
                    });
                
                    // Escucha el evento de eliminación
                    selectElement.addEventListener('removeItem', function(event) {
                        const itemValue = event.detail.value; // Obtén el valor del elemento eliminado
                
                        // Elimina el valor del estado
                        if (estadoRelaciones[itemValue]) {
                            delete estadoRelaciones[itemValue];
                        }
                
                        // Actualiza la vista o realiza otras acciones necesarias
                        actualizarContenidoSeleccionado(Object.keys(estadoRelaciones));
                    });
                
                    choicesInstances.push(instance);
                });
                
                llenarRestricciones(choicesInstances);
                // Llama a la función para inicializar el handler del select
                seleccionarRestricciones();
                cambiarNombre();
                // Delegación de eventos para botones de descarga
                // Función que maneja el clic en botones con clase `.btn-descargar`

                // Delegación de eventos para botones de descarga
                d.addEventListener("click", handleDownloadClick);

                d.getElementById("btn-copiar").addEventListener("click", copiar_tabla_nombre );
                d.addEventListener("click", manejarMigraciones);
            });
            break;
        case "especificacion_proyecto":
            $("#main-content").load("../componentes/especificacion_proyecto.html");
            break;
        case "comandos_proyecto":
            $("#main-content").load("../componentes/comandos_proyecto.html", function(){
                copiarCodigo();
            });
            break;
        case "implementar_politicas":
            $("#main-content").load("../componentes/implementar_politicas.html", function(){
                copiarCodigo();
            });
            break;
        case "estructurar_politicas":
            $("#main-content").load("../componentes/estructurar_politicas.html", function(){
                copiarCodigo();
            });
            break;
            default:
            // Cargar una página por defecto o mostrar un mensaje de error
            $("#main-content").html("<p>Página no encontrada</p>");
            break;
    }
}

// Escuchar cambios en la URL
window.addEventListener("hashchange", cargarContenidoDesdeHash);

// Cargar el contenido inicial según el hash actual al cargar la página
d.addEventListener("DOMContentLoaded", cargarContenidoDesdeHash);
