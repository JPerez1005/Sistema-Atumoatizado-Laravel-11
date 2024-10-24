export function actualizarNombreDelProyecto() {
    const projectName = localStorage.getItem("nombreProyecto");
    console.log("Intentando actualizar nombre del proyecto:", projectName); // Log adicional

    if (projectName) {
        const elementos = document.querySelectorAll("#nombreProyecto");
        elementos.forEach(elemento => {
            elemento.value = projectName;
            elemento.textContent = projectName;
        });
        console.log(elementos.length);
    }else{
        console.log("No existe ningun id con ese nombre");
    }
}

export function copiarCodigo() {
    // Crear instancia global de ClipboardJS para todos los botones con la clase copiar-btn
    const clipboard = new ClipboardJS('.copiar-btn', {
        text: function(trigger) {
            // Obtener el atributo data-code del botón clicado
            const codigoId = trigger.getAttribute('data-code');
            const codigoElement = document.querySelector(`#${codigoId}`);

            // Si existe el elemento con ese ID, tomamos su texto
            if (codigoElement) {
                return codigoElement.textContent.trim(); // Obtenemos el texto del <pre> y lo limpiamos de espacios innecesarios
            } else {
                return "Código no encontrado";
            }
        }
    });

    // Manejo de eventos de éxito
    clipboard.on('success', function(e) {
        // Cambiar el texto del botón al que se hizo clic
        const trigger = e.trigger;  // El botón que activó el evento
        const originalText = trigger.textContent;
        trigger.textContent = 'copiado!';

        // Regresar el texto original después de 2 segundos
        setTimeout(() => {
            trigger.textContent = originalText;
        }, 1000);

        e.clearSelection();
    });

    // Manejo de eventos de error
    clipboard.on('error', function(e) {
        const trigger = e.trigger;  // El botón que activó el evento
        const originalText = trigger.textContent;
        trigger.textContent = 'Error al copiar';

        // Regresar el texto original después de 2 segundos
        setTimeout(() => {
            trigger.textContent = originalText;
        }, 1000);

        console.error('Error al copiar el código:', e);
    });
}






// Evento para el botón de copiar código
// document.querySelector("#copiarCodigo").addEventListener("click", function() {
//     // Obtener el nombre del proyecto desde el input
//     const projectName = document.querySelector("#nombreProyecto").value || "nombre-del-proyecto";

//     // Guardar el nombre del proyecto en LocalStorage
//     localStorage.setItem("nombreProyecto", projectName);

//     // Crear el código con el nombre del proyecto
//     const code = `
// composer global remove laravel/installer
// composer global require laravel/installer
// laravel new ${projectName}
//     `;

//     // Actualizar el contenedor de código
//     document.querySelector("#codigo").textContent = code;

//     // Copiar el código al portapapeles
//     new ClipboardJS('.btn', {
//         text: function() {
//             return document.querySelector("#codigo").textContent;
//         }
//     });
// });