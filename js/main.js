import {actualizarNombreDelProyecto,copiarCodigo} from './instalacion_proyecto.js';
import { cargarArchivo, crearMigracion, llenarRestricciones, cambiarNombre, seleccionarRestricciones, estadoRelaciones, actualizarContenidoSeleccionado  } from './estructuracion_proyecto.js';
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
    // Cargar el componente y luego ejecutar actualizarNombreDelProyecto
    $("#instalacion_proyecto").load("../componentes/instalacion_proyecto.html", function() {
        // Aquí ya se ha cargado el contenido dinámico
        actualizarNombreDelProyecto();
        copiarCodigo();
    });
    $("#configuracion_proyecto").load("../componentes/configuracion_proyecto.html");
    $("#estructuracion_proyecto").load("../componentes/estructuracion_proyecto.html",function(){
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
    });
});