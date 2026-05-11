# Cómo probar los endpoints con Thunder Client

## ¿Qué es Thunder Client?
Thunder Client es una extensión de Visual Studio Code que permite
hacer peticiones HTTP para probar APIs REST sin salir del editor.

## Instalación
1. Abrir Visual Studio Code
2. Presionar Ctrl+Shift+X para abrir Extensiones
3. Buscar "Thunder Client"
4. Hacer clic en Instalar
5. Aparecerá un ícono de rayo en la barra lateral izquierda

## Pasos para probar cada endpoint

### Paso 1
Hacer clic en el ícono de rayo en la barra lateral de VS Code

### Paso 2
Hacer clic en el botón "New Request"

### Paso 3
Seleccionar el método GET en el menú desplegable

### Paso 4
Escribir la URL del endpoint en la barra de dirección

### Paso 5
Hacer clic en el botón "Send"

### Paso 6
Ver la respuesta JSON en el panel derecho con su código HTTP

---

## Endpoints disponibles para probar

| Método | URL | Descripción | Respuesta esperada |
|--------|-----|-------------|-------------------|
| GET | /api/libros | Lista todos los libros | 200 OK |
| GET | /api/libros?nombre=1984 | Busca libro por nombre | 200 OK |
| GET | /api/libros/3 | Obtiene libro con ID 3 | 200 OK |
| GET | /api/libros/99 | ID que no existe | 404 Not Found |
| GET | /api/libros/abc | ID no numérico | 400 Bad Request |

---

## URL base del servidor desplegado en Render
https://api-libros-jpd6.onrender.com

## Ejemplos completos para probar en Thunder Client
- https://api-libros-jpd6.onrender.com/api/libros
- https://api-libros-jpd6.onrender.com/api/libros?nombre=1984
- https://api-libros-jpd6.onrender.com/api/libros/3
- https://api-libros-jpd6.onrender.com/api/libros/99
- https://api-libros-jpd6.onrender.com/api/libros/abc

---

## Manejo de errores
- **200 OK** → La petición fue exitosa y devuelve datos
- **400 Bad Request** → El ID enviado no es un número válido
- **404 Not Found** → El libro buscado no existe en el sistema