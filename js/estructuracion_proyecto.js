export async function cargarArchivo() {
    try {
        const response = await fetch('./doc/2024_10_22_030242_create_prueba2s_table.php'); // Ajusta la ruta según ubicación real
        if (!response.ok) throw new Error('Error al cargar el archivo');
        const data = await response.text();
        document.getElementById("jsPreview").textContent = data;

        // Ahora que el contenido está cargado, agrega los listeners
        agregarListeners();

        // Botón para descargar el archivo
        document.getElementById("downloadButton").addEventListener("click", descargarArchivo);
        
        // Actualiza el combo box con migraciones guardadas
        actualizarComboBox();
        
    } catch (error) {
        console.error(error.message);
    }
}

// Función para agregar los listeners a los checkboxes y el combo box
function agregarListeners() {
    const checkboxes = ['enableVue', 'enableRouter', 'enablePlugins'];
    
    checkboxes.forEach(nombre => {
        const checkbox = document.getElementById(nombre);
        
        if (checkbox) {
            checkbox.addEventListener("change", actualizarArchivo);
        } else {
            console.error(`Checkbox con ID ${nombre} no encontrado`);
        }
    });

    // Listener para el combo box
    const migrationsSelect = document.getElementById("migrationsSelect");
    migrationsSelect.addEventListener("change", actualizarArchivo); // Agregar listener al select
}

// Actualiza el contenido del archivo basado en checkboxes y en el combo box
async function actualizarArchivo() {
    // Cargar nuevamente el contenido del archivo
    const response = await fetch('./doc/2024_10_22_030242_create_prueba2s_table.php'); // Ajusta la ruta según ubicación real
    const data = await response.text();
    let contenido = data.split('\n'); // Dividir en líneas

    // Configura las líneas en las que deseas agregar las importaciones
    const lineasImportacion = {
        enableVue: 0,       // Línea 1 para Vue
        enableRouter: 1,    // Línea 2 para Vue Router
        enablePlugins: 4    // Línea 3 para Plugin
    };

    // Importaciones que deseas agregar
    const imports = {
        enableVue: "import Vue from 'vue';",
        enableRouter: "import VueRouter from 'vue-router';",
        enablePlugins: "import Plugin from 'some-plugin';"
    };

    // Agregar o quitar importaciones según el estado del checkbox
    Object.keys(imports).forEach(id => {
        const checkbox = document.getElementById(id);
        if (!checkbox) {
            console.error(`Checkbox con ID ${id} no encontrado`);
            return; // Salir si el checkbox no existe
        }

        const linea = lineasImportacion[id];
        const index = contenido.findIndex(line => line.includes(imports[id]));

        if (checkbox.checked) {
            if (index === -1) {
                // Si no existe, agregar la importación en la línea específica
                contenido.splice(linea, 0, imports[id]);
            }
        } else {
            if (index !== -1) {
                // Si está desmarcado y existe, eliminar la importación
                contenido.splice(index, 1);
            }
        }
    });

    // Obtener el valor seleccionado del combo box
    const migrationsSelect = document.getElementById("migrationsSelect");
    const nombreTabla = migrationsSelect.value; // Obtener el nombre de la migración seleccionada

    // Reemplazar 'nombre_tabla' con el nombre de la migración
    if (nombreTabla) {
        contenido = contenido.map(line => line.replace(/nombre_tabla/g, nombreTabla));
    }

    // Actualiza el contenido en el <pre> con las líneas unidas de nuevo en un solo texto
    document.getElementById("jsPreview").textContent = contenido.join('\n');
}

// Descargar el archivo modificado
function descargarArchivo() {
    const contenido = document.getElementById("jsPreview").textContent;
    const blob = new Blob([contenido], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vite.config.js';
    a.click();
    URL.revokeObjectURL(url); // Limpia la URL creada
}

// Función que se ejecuta al hacer clic en el botón
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

// Función para actualizar el combobox con las migraciones del localStorage
function actualizarComboBox() {
    const migrationsSelect = document.getElementById("migrationsSelect");
    migrationsSelect.innerHTML = '<option value="">-- Selecciona --</option>'; // Reinicia las opciones
    const migracionesGuardadas = JSON.parse(localStorage.getItem("migrations")) || [];

    migracionesGuardadas.forEach(migracion => {
        const option = document.createElement("option");
        option.value = migracion; // Establece el valor de la opción
        option.textContent = migracion; // Establece el texto visible
        migrationsSelect.appendChild(option); // Añade la opción al select
    });
}
