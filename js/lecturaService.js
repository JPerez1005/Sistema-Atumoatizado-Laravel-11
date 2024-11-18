import {d} from './main.js';

export let previewContent = {};

// Función para leer el documento
export async function leer_documento(documento, desfragmentar, fuente = "origen", elementoId = null) {

    if (elementoId) {
        const elemento = document.getElementById(elementoId);
        if (elemento) {
            const contenidoElemento = elemento.textContent;
            console.log("Contenido leído del elemento:", contenidoElemento);
            return desfragmentar === "si" ? contenidoElemento.split('\n') : contenidoElemento;
        } else {
            console.error(`Elemento con ID ${elementoId} no encontrado.`);
            return null;
        }
    }

    if (fuente === "preview" && previewContent[documento]) {
        console.log("Contenido encontrado en previewContent:", previewContent[documento]);
        return previewContent[documento];
    }

    const response = await fetch(documento);
    if (!response.ok) throw new Error('Error al cargar el archivo');
    const data = await response.text();

    if (fuente === "preview") {
        previewContent[documento] = data.split('\n');
        // console.log("Contenido guardado en preview:", previewContent[documento]);
    }

    return desfragmentar === "si" ? data.split('\n') : data;
}

// Función para agregar contenido en una línea específica
function agregarContenidoEnLinea(contenido, linea, nuevoContenido) {
    while (linea >= contenido.length) {
        contenido.push('');
    }
    contenido.splice(linea, 0, nuevoContenido);
    return contenido;
}

// Función para agregar contenido en una línea y columna específicas
function agregarContenidoLineaYColumna(contenido, linea, columna, nuevoContenido) {
    while (linea >= contenido.length) {
        contenido.push('');
    }

    let lineaContenido = contenido[linea];
    while (columna > lineaContenido.length) {
        lineaContenido += ' ';
    }

    contenido[linea] = lineaContenido.slice(0, columna) + nuevoContenido + lineaContenido.slice(columna);
    return contenido;
}

// Función para eliminar contenido en una línea específica
function eliminarContenidoEnLinea(contenido, linea) {
    if (linea < contenido.length) {
        contenido.splice(linea, 1);
    }
    return contenido;
}

// Función para eliminar contenido en una línea y columna específicas
function eliminarContenidoLineaYColumna(contenido, linea, columna, longitud) {
    if (linea < contenido.length) {
        let lineaContenido = contenido[linea];
        contenido[linea] = lineaContenido.slice(0, columna) + lineaContenido.slice(columna + longitud);
    }
    return contenido;
}

// Función para reemplazar contenido en una línea específica
function reemplazarContenidoEnLinea(contenido, linea, nuevoContenido) {
    if (linea < contenido.length) {
        contenido[linea] = nuevoContenido;
    }
    return contenido;
}

// Función para reemplazar contenido en una línea y columna específicas
function reemplazarContenidoLineaYColumna(contenido, linea, columna, nuevoContenido) {
    if (linea < contenido.length) {
        let lineaContenido = contenido[linea];
        contenido[linea] = lineaContenido.slice(0, columna) + nuevoContenido + lineaContenido.slice(columna + nuevoContenido.length);
    }
    return contenido;
}

// Función para reemplazar todas las ocurrencias de una palabra específica
function reemplazarPalabra(contenido, palabra, nuevoContenido) {
    return contenido.map(linea => linea.replace(new RegExp(palabra, 'g'), nuevoContenido));
}

// Modificación de la función `modificarContenido` para incluir la opción de reemplazo
export async function modificarContenido(documentoRuta, previewId, linea, columna, nuevoContenido, tipoInsercion, eliminar = false, palabraReemplazo = null) {
    try {
        let contenido = previewContent[documentoRuta] || await leer_documento(documentoRuta, "si", "preview");

        if (eliminar) {
            switch (tipoInsercion) {
                case "linea":
                    contenido = eliminarContenidoEnLinea(contenido, linea);
                    break;
                case "lineaYColumna":
                    contenido = eliminarContenidoLineaYColumna(contenido, linea, columna, nuevoContenido.length);
                    break;
                default:
                    console.error("Tipo de eliminación no reconocido.");
                    return;
            }
        } else {
            switch (tipoInsercion) {
                case "linea":
                    contenido = agregarContenidoEnLinea(contenido, linea, nuevoContenido);
                    break;
                case "lineaYColumna":
                    contenido = agregarContenidoLineaYColumna(contenido, linea, columna, nuevoContenido);
                    break;
                case "reemplazarLinea":
                    contenido = reemplazarContenidoEnLinea(contenido, linea, nuevoContenido);
                    break;
                case "reemplazarLineaYColumna":
                    contenido = reemplazarContenidoLineaYColumna(contenido, linea, columna, nuevoContenido);
                    break;
                case "reemplazarPalabra":
                    if (palabraReemplazo) {
                        contenido = reemplazarPalabra(contenido, palabraReemplazo, nuevoContenido);
                    } else {
                        console.error("Se requiere una palabra para realizar el reemplazo.");
                        return;
                    }
                    break;
                default:
                    console.error("Tipo de inserción no reconocido.");
                    return;
            }
        }

        previewContent[documentoRuta] = contenido;
        document.getElementById(previewId).textContent = contenido.join('\n');
        // console.log(`Contenido actualizado para ${documentoRuta}:`, contenido);

    } catch (error) {
        console.error("Error al modificar el contenido:", error.message);
    }
}

function descargarArchivo(tipo) {
    const contenido = tipo === 'migracion'
        ? d.getElementById("jsPreview").textContent
        : d.getElementById("modeloPreview").textContent;

    const nombre = tipo === 'migracion' ? "migracion.php" : "modelo.php";
    const blob = new Blob([contenido], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = nombre;
    a.click();
    URL.revokeObjectURL(url); // Limpia la URL creada
}

export function handleDownloadClick(e) {
    const button = e.target.closest('.btn-descargar');
    if (button) {
        const tipo = button.dataset.descargar; // Obtén el atributo data-descargar
        if (tipo) {
            descargarArchivo(tipo); // Llama a la función de descarga
        } else {
            console.error("El botón no tiene el atributo data-descargar.");
        }
    }
}