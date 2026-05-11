const express = require("express"); // Importa el módulo Express instalado con npm
const app = express(); // Crea una instancia de la aplicación Express
const PORT = process.env.PORT || 3000; // Define el puerto: usa el de Render o 3000 en local
console.log(`Puerto asignado: ${PORT}`); // Muestra en consola qué puerto se está usando

app.use(express.json()); // Middleware: permite recibir y leer datos en formato JSON
app.set('json spaces', 2); // Formatea las respuestas JSON con sangría de 2 espacios

// Arreglo que almacena los libros en memoria (simula una base de datos)
const libros = [
  { id: 1, nombre: "Cien años de soledad",     anio: 1967, autor: "Gabriel García Márquez" },  // Libro 1
  { id: 2, nombre: "El Principito",            anio: 1943, autor: "Antoine de Saint-Exupéry" }, // Libro 2
  { id: 3, nombre: "Don Quijote de la Mancha", anio: 1605, autor: "Miguel de Cervantes" },      // Libro 3
  { id: 4, nombre: "1984",                     anio: 1949, autor: "George Orwell" },            // Libro 4
  { id: 5, nombre: "Orgullo y prejuicio",      anio: 1813, autor: "Jane Austen" },              // Libro 5
];

// RUTA RAÍZ - Se invoca cuando el cliente accede a GET /
app.get("/", (req, res) => {        // Define la ruta GET para la URL raíz "/"
  res.json({                        // Responde con un objeto JSON
    mensaje: "Bienvenido a la API de Libros ", // Mensaje de bienvenida
    endpoints: {                    // Lista los endpoints disponibles
      "Todos los libros":  "GET /api/libros",           // Endpoint para listar libros
      "Buscar por nombre": "GET /api/libros?nombre=<texto>", // Endpoint para buscar
      "Detalle por ID":    "GET /api/libros/:id",       // Endpoint para buscar por ID
    },
  });
});

// RUTA LISTAR/BUSCAR - Se invoca cuando el cliente accede a GET /api/libros
app.get("/api/libros", (req, res) => { // Define la ruta GET para "/api/libros"
  const { nombre } = req.query;        // Extrae el parámetro "nombre" de la URL (?nombre=xxx)

  if (nombre) {    // Si el cliente envió el parámetro nombre
    const resultado = libros.filter((libro) => // Filtra el arreglo de libros
      libro.nombre.toLowerCase().includes(nombre.toLowerCase()) // Compara sin distinción de mayúsculas
    );

    if (resultado.length === 0) {      // Si no se encontró ningún libro
      return res.status(404).json({    // Responde con código 404 (No encontrado)
        error: `No se encontraron libros con el nombre "${nombre}"`, // Mensaje de error
      });
    }

    return res.json({              // Si encontró libros, los devuelve
      total: resultado.length,    // Cantidad de libros encontrados
      libros: resultado,         // Arreglo con los libros encontrados
    });
  }

  res.json({                  // Si no hay filtro, devuelve todos los libros
    total: libros.length,    // Total de libros en el arreglo
    libros,                 // El arreglo completo de libros
  });
});

// RUTA POR ID - Se invoca cuando el cliente accede a GET /api/libros/:id
app.get("/api/libros/:id", (req, res) => { // Define la ruta dinámica con parámetro :id
  const id = parseInt(req.params.id, 10);  // Convierte el parámetro :id de texto a número entero

  if (isNaN(id)) {   // Si el ID no es un número válido
    return res.status(400).json({   // Responde con código 400 (Petición incorrecta)
      error: "El ID debe ser un número entero válido", // Mensaje de error
    });
  }

  const libro = libros.find((l) => l.id === id); // Busca el libro cuyo id coincida

  if (!libro) {    // Si no se encontró ningún libro con ese ID
    return res.status(404).json({   // Responde con código 404 (No encontrado)
      error: `Libro con ID ${id} no encontrado`, // Mensaje de error con el ID buscado
    });
  }

  res.json(libro); // Si encontró el libro, lo devuelve como JSON
});

// RUTA NO ENCONTRADA - Se invoca cuando ninguna ruta anterior coincide
app.use((req, res) => {   // Captura cualquier ruta no definida
  res.status(404).json({    // Responde con código 404
    error: `Ruta ${req.originalUrl} no encontrada`, // Muestra qué ruta intentó acceder
  });
});

// INICIAR SERVIDOR - Se ejecuta una sola vez al arrancar la aplicación
app.listen(PORT, () => {  // Pone el servidor en escucha en el puerto definido
  console.log(` Servidor corriendo en http://localhost:${PORT}`); // Confirma que está listo
});