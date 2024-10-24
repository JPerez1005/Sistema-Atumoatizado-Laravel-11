import {actualizarNombreDelProyecto,copiarCodigo} from './instalacion_proyecto.js';

document.addEventListener("DOMContentLoaded", () => {
    const projectName = localStorage.getItem("nombreProyecto");
    
    if (projectName === null) {
        console.log("nombreProyecto no está en localStorage");
    } else {
        console.log("Valor de nombreProyecto:", projectName);
    }
    
});

// Cargar componentes modulares
$(function(){
    $("#navbar").load("../componentes/navbar.html");
    $("#sidebar").load("../componentes/sidebar.html");
    // Cargar el componente y luego ejecutar actualizarNombreDelProyecto
    $("#instalacion_proyecto").load("../componentes/instalacion_proyecto.html", function() {
        // Aquí ya se ha cargado el contenido dinámico
        actualizarNombreDelProyecto();
        copiarCodigo();
    });
});