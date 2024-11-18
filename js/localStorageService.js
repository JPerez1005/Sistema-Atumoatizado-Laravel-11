// localStorageService.js

// Función para guardar datos en LocalStorage
export function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Función para cargar datos desde LocalStorage
export function loadFromLocalStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

// Función para agregar un nuevo dato a una lista en LocalStorage
export function addToLocalStorageList(key, item) {
    const existingData = loadFromLocalStorage(key) || [];
    existingData.push(item);
    saveToLocalStorage(key, existingData);
}

// Función para borrar datos de LocalStorage
export function deleteFromLocalStorage(key) {
    localStorage.removeItem(key);
}
