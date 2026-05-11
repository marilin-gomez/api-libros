const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
console.log(`Puerto asignado: ${PORT}`);

app.use(express.json());

const libros = [
  { id: 1, nombre: "Cien años de soledad",     anio: 1967, autor: "Gabriel García Márquez" },
  { id: 2, nombre: "El Principito",            anio: 1943, autor: "Antoine de Saint-Exupéry" },
  { id: 3, nombre: "Don Quijote de la Mancha", anio: 1605, autor: "Miguel de Cervantes" },
  { id: 4, nombre: "1984",                     anio: 1949, autor: "George Orwell" },
  { id: 5, nombre: "Orgullo y prejuicio",      anio: 1813, autor: "Jane Austen" },
];

// Ruta raíz
app.get("/", (req, res) => {
  res.json({ mensaje: "Bienvenido a la API de Libros " });
});

// Listar todos o buscar por nombre
app.get("/api/libros", (req, res) => {
  const { nombre } = req.query;

  if (nombre) {
    const resultado = libros.filter((libro) =>
      libro.nombre.toLowerCase().includes(nombre.toLowerCase())
    );
    if (resultado.length === 0) {
      return res.status(404).json({ error: `No se encontraron libros con el nombre "${nombre}"` });
    }
    return res.json({ total: resultado.length, libros: resultado });
  }

  res.json({ total: libros.length, libros });
});

// Obtener libro por ID
app.get("/api/libros/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ error: "El ID debe ser un número válido" });
  }

  const libro = libros.find((l) => l.id === id);

  if (!libro) {
    return res.status(404).json({ error: `Libro con ID ${id} no encontrado` });
  }

  res.json(libro);
});

// Ruta no encontrada
app.use((req, res) => {
  res.status(404).json({ error: `Ruta ${req.originalUrl} no encontrada` });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(` Servidor corriendo en http://localhost:${PORT}`);
});