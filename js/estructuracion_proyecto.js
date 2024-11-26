import {d} from './main.js';
import {loadFromLocalStorage} from './localStorageService.js';
import {previewContent, leer_documento, modificarContenido, copiar} from './lecturaService.js';

// Cargar archivos
export async function cargarArchivo() {
    try {
        if (!previewContent['../doc/2024_10_22_030242_create_prueba2s_table.php']) {
            d.getElementById("jsPreview").textContent = await leer_documento('../doc/2024_10_22_030242_create_prueba2s_table.php', "no", "preview");
        }

        if (!previewContent['../doc/prueba2.php']) {
            d.getElementById("modeloPreview").textContent = await leer_documento('../doc/prueba2.php', "no", "preview");
        }

        agregarListeners();
        
        
        // Llamadas de ejemplo para agregar modificaciones
        await modificarContenido('../doc/Prueba2.php', 'modeloPreview', 5, null, '', 'linea');
        await modificarContenido('../doc/Prueba2.php', 'modeloPreview', 6, 2, '', 'lineaYColumna');
    } catch (error) {
        console.error(error.message);
    }
}

// Función para agregar los listeners a los checkboxes y el combo box
function agregarListeners() {
    const checkboxes = ['textField', 'intField', 'enumField','dateField','booleanField','foreignField'];
    
    checkboxes.forEach(nombre => {
        const checkbox = document.getElementById(nombre);
        
        if (checkbox) {
            checkbox.addEventListener("change", datosCheckBox);
        } else {
            console.error(`Checkbox con ID ${nombre} no encontrado`);
        }
    });
}

// Función para manejar los cambios en los checkboxes
function datosCheckBox(event) {
    const checkbox = event.target;
    const checkboxId = checkbox.id;
    const documentoRuta1 = '../doc/Prueba2.php';
    const documentoRuta2 = '../doc/2024_10_22_030242_create_prueba2s_table.php';
    const previewId = 'modeloPreview';
    const previewId2 = 'jsPreview';

    switch (checkboxId) {
        case 'textField':
            modificarContenido(documentoRuta1, previewId, 12, 25, "'nombre',", 'lineaYColumna', !checkbox.checked);
            modificarContenido(documentoRuta1, previewId, 18, null, "    'nombre'=>'required|min:5|max:500'", 'linea', !checkbox.checked);
            modificarContenido(documentoRuta2, previewId2, 15, null, "            $table->string('nombre');", 'linea', !checkbox.checked);
            break;
        case 'intField':
            modificarContenido(documentoRuta1, previewId, 12, 25, "'stock',", 'lineaYColumna', !checkbox.checked);
            modificarContenido(documentoRuta1, previewId, 18, null, "    'stock'=>'required|integer|gt:0'", 'linea', !checkbox.checked);
            modificarContenido(documentoRuta2, previewId2, 15, null, "            $table->integer('cantidad');", 'linea', !checkbox.checked);
            break;
        case 'enumField':
            modificarContenido(documentoRuta1, previewId, 12, 25, "'regular',", 'lineaYColumna', !checkbox.checked);
            modificarContenido(documentoRuta1, previewId, 18, null, "    'rol'=>'required|in:admin,regular'", 'linea', !checkbox.checked);
            modificarContenido(documentoRuta2, previewId2, 15, null, "            $table->enum('rol', ['admin', 'regular']);", 'linea', !checkbox.checked);
            break;
        case 'dateField':
            modificarContenido(documentoRuta1, previewId, 12, 25, "'fecha',", 'lineaYColumna', !checkbox.checked);
            modificarContenido(documentoRuta1, previewId, 18, null, "    'fecha'=>'required|date'", 'linea', !checkbox.checked);
            modificarContenido(documentoRuta2, previewId2, 15, null, "            $table->date('fecha_nacimiento');", 'linea', !checkbox.checked);
            break;
        case 'booleanField':
            modificarContenido(documentoRuta1, previewId, 12, 25, "'estado',", 'lineaYColumna', !checkbox.checked);
            modificarContenido(documentoRuta1, previewId, 18, null, "    'estado'=>'required|boolean'", 'linea', !checkbox.checked);
            modificarContenido(documentoRuta2, previewId2, 15, null, "            $table->boolean('estado');", 'linea', !checkbox.checked);
            break;
        case 'foreignField':
            modificarContenido(documentoRuta1, previewId, 12, 25, "'padre_id',", 'lineaYColumna', !checkbox.checked);
            modificarContenido(documentoRuta1, previewId, 18, null, "    'padre_id'=>'required|exists:padre,id'", 'linea', !checkbox.checked);
            modificarContenido(documentoRuta2, previewId2, 15, null, "            $table->foreignId('padre_id')->constrained();", 'linea', !checkbox.checked);
            break;
        default:
            console.error(`No hay acción definida para el checkbox con ID ${checkboxId}`);
            break;
    }
}

// Función para cargar los nombres de la clave "migrations" en el select
export function cambiarNombre() {
    // Obtiene el elemento select por su ID
    const select = document.getElementById('migrationsSelect');

    // Limpia las opciones existentes (excepto la primera opción predeterminada)
    select.innerHTML = '<option selected>Seleccionar</option>';

    // Carga los datos de la clave "migrations" desde LocalStorage
    const tablas = loadFromLocalStorage("migrations");

    // Si hay datos, agrega cada uno como una opción en el select
    if (tablas && Array.isArray(tablas)) {
        tablas.forEach(tabla => {
            const option = document.createElement('option');
            option.value = tabla;
            option.textContent = tabla;
            select.appendChild(option);
        });
    } else {
        console.log("No se encontraron tablas en LocalStorage para la clave 'migrations'");
    }

    let palabraAReemplazar = "nombre_tabla";

    select.addEventListener('change', (event) => {
        const seleccion = event.target.value;
        console.log("Opción seleccionada:", seleccion);

        // Llama a modificarContenido para reemplazar "palabraAReemplazar" con la selección del usuario
        modificarContenido('../doc/Prueba2.php', 'modeloPreview', null, null, seleccion, 'reemplazarPalabra', false, palabraAReemplazar);
        modificarContenido('../doc/2024_10_22_030242_create_prueba2s_table.php', 'jsPreview', null, null, seleccion, 'reemplazarPalabra', false, palabraAReemplazar);

        // Actualiza la palabra a reemplazar con el valor seleccionado actual
        palabraAReemplazar = seleccion;
    });
}

// Función para llenar restricciones en todas las instancias de Choices
export function llenarRestricciones(choicesInstances) {
    const tablas = loadFromLocalStorage("migrations");

    if (tablas && Array.isArray(tablas)) {
        // Recorrer todas las instancias y agregar opciones a cada una
        choicesInstances.forEach(choicesInstance => {
            tablas.forEach(value => {
                choicesInstance.setChoices(
                    [{ value: value, label: value, selected: false }],
                    'value',
                    'label',
                    false
                );
                // console.log("Opción añadida:", value);
            });
        });
    } else {
        console.log("No se encontraron valores para cargar en el select.");
        alert("No aparecerán migraciones si primero no las crea");
    }
}

// Objeto para almacenar el estado de cada relación
export let estadoRelaciones = {};

// Función para manejar los cambios de selección
export async function seleccionarRestricciones() {
    const selectElement = d.getElementById('conexionSuperior');
    const selectElement2 = d.getElementById('conexionInferior');
    const selectElement3 = d.getElementById('conexionUno');
    const selectElement4 = d.getElementById('conexionMuchos');

    // Definimos el estado previo para guardar las selecciones anteriores
    let estadoPrevio = {};

    // Función que maneja el cambio en cualquier select
    const handleSelectChange = (numero, selectElement) => {
        const selectedOptions = Array.from(selectElement.selectedOptions).map(option => option.value);

        selectedOptions.forEach((seleccion) => {
            // Si la opción seleccionada no estaba en `estadoRelaciones`, la agregamos
            if (!estadoRelaciones.hasOwnProperty(seleccion)) {
                estadoRelaciones[seleccion] = numero;
            } 
            // Si la opción seleccionada ya existía en `estadoRelaciones` y está en el select actual, actualizamos solo si el número cambió
            else if (estadoRelaciones[seleccion] !== numero) {
                estadoRelaciones[seleccion] = numero;
            }
        });

        // Combinamos las opciones seleccionadas de ambos selects y eliminamos duplicados
        const combinedSelectedOptions = [...new Set([...Object.keys(estadoRelaciones)])];

        // Guardamos el estado actual como estado previo
        estadoPrevio = { ...estadoRelaciones };
        console.log(estadoRelaciones);
        
        // Llamamos a la función con todas las opciones combinadas de ambos selects
        actualizarContenidoSeleccionado(combinedSelectedOptions);
    };

    if (selectElement) {
        selectElement.addEventListener('change', () => handleSelectChange(1, selectElement));
    }

    if (selectElement2) {
        selectElement2.addEventListener('change', () => handleSelectChange(2, selectElement2));
    }

    if (selectElement3) {
        selectElement3.addEventListener('change', () => handleSelectChange(3, selectElement3));
    }

    if (selectElement4) {
        selectElement4.addEventListener('change', () => handleSelectChange(4, selectElement4));
    }

    if (!selectElement && !selectElement2  && !selectElement3 && !selectElement4) {
        console.error("Ninguno de los elementos select se encontró.");
    }
}

// Actualiza el contenido según las opciones seleccionadas y su tipo de relación
export function actualizarContenidoSeleccionado(selectedOptions) {
    if (selectedOptions.length === 0) {
        modificarContenido('../doc/Prueba2.php', 'modeloPreview', 21, null, "}", 'linea', false);
    }

    // Obtén todos los checkboxes dentro del contenedor
    const checkboxes = document.querySelectorAll('.custom-control input[type="checkbox"]');
    const selectedCheckboxes = Array.from(checkboxes).filter(checkbox => checkbox.checked);
    let adiccion = selectedCheckboxes.length;

    // Limpia las líneas anteriores antes de agregar las nuevas
    for (let i = selectedOptions.length; i >= -1; i--) {
        modificarContenido('../doc/Prueba2.php', 'modeloPreview', i + 21 + adiccion, null, '', 'linea', true);
    }

    // Agrega cada opción con el tipo de relación almacenado
    selectedOptions.forEach((seleccion, index) => {
        // Usa el estado almacenado para obtener el número de relación
        const numeroRelacion = estadoRelaciones[seleccion] || 1;  // Default a 1 si no está definido
        let contenido = contenidoPersonalizado(numeroRelacion, seleccion);

        let adiccion = selectedCheckboxes.length + index;
        modificarContenido('../doc/Prueba2.php', 'modeloPreview', 20 + adiccion, null, contenido, 'linea', false);

        if (index === selectedOptions.length - 1) {
            modificarContenido('../doc/Prueba2.php', 'modeloPreview', 21 + adiccion, null, "}", 'linea', false);
        }
    });
}

// Función para generar el contenido personalizado según el tipo de relación
function contenidoPersonalizado(numero, seleccion) {
    const seleccionConMayuscula = seleccion.charAt(0).toUpperCase() + seleccion.slice(1);
    let contenido;

    switch (numero) {
        case 1:
            contenido = 
    `function ${seleccion}() {
        return $this->hasMany(${seleccionConMayuscula}::class);
    }`;
            break;
        case 2:
            contenido = 
    `function ${seleccion}() {
        return $this->belongsTo(${seleccionConMayuscula}::class);
    }`;
            break;
        case 3:
            contenido = 
    `function ${seleccion}() {
        return $this->hasOne(${seleccionConMayuscula}::class);
    }`;
            break;
        case 4:
            contenido = 
    `function ${seleccion}() {
        return $this->belongsToMany(${seleccionConMayuscula}::class);
    }`;
            break;
        default:
            console.error("Número no válido para definir la relación");
            contenido = "";
            break;
    }

    return contenido;
}

export function crearMigracion() {
    const input = document.getElementById("migrationName");
    const migrationName = input.value.trim(); // Obtener el nombre ingresado

    if (migrationName) {
        const command = `php artisan make:model ${migrationName} --migration`; // Generar la línea de comando

        // Copiar al portapapeles
        navigator.clipboard.writeText(command).then(() => {
            console.log(`Comando copiado: ${command}`);

            // Actualizar localStorage
            let migrations = JSON.parse(localStorage.getItem('migrations')) || [];
            if (!migrations.includes(migrationName)) {
                migrations.push(migrationName); // Agregar nombre si no está en el arreglo
                localStorage.setItem('migrations', JSON.stringify(migrations)); // Guardar en localStorage
            }

            input.value = ''; // Limpiar el input
        }).catch(err => {
            console.error('Error al copiar el comando: ', err);
        });
    } else {
        alert('Por favor, ingresa un nombre para la migración.'); // Validación si el input está vacío
    }
}

export function copiar_tabla_nombre(){
    const prefix = d.querySelector(".input-group-prepend .input-group-text").textContent;
    const inputValue = d.getElementById("nombre-tabla").value.trim();
    const suffix = d.querySelector(".input-group-append .input-group-text").textContent;

    const textoCopiar = `${prefix} ${inputValue} ${suffix}`;

    copiar(textoCopiar);
}

export function manejarMigraciones(e) { 
    // La función ahora acepta el evento `e`
    if (e.target.matches(".dropdown-item")) {
        const accion = e.target.dataset.action; // Obtener el valor del atributo data-action
        let textoCopiar;

        switch (accion) {
            case "inicializar":
                textoCopiar = "php artisan migrate";
                break;
            case "actualizar":
                textoCopiar = "php artisan migrate:refresh";
                break;
            case "eliminar":
                textoCopiar = "php artisan migrate:rollback";
                break;
            default:
                console.error("Acción no reconocida");
                return; // No continuar si no hay acción válida
        }

        copiar(textoCopiar); // Llama a la función `copiar` para copiar al portapapeles
    }
}