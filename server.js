const express = require("express")
const fs = require("fs")
const path = require("path")

const app = express()
const PORT = 3000
const FILE = path.join(__dirname, "mascotas.json")

app.use(express.json())
app.use(express.static("public"))

// Funciones de lectura y escritura
const leer = () => {
  try { return JSON.parse(fs.readFileSync(FILE)) } 
  catch { return [] }
}
const guardar = data => fs.writeFileSync(FILE, JSON.stringify(data, null, 2))

// GET mascotas
app.get("/mascotas", (req, res) => {
  try {
    const { nombre, rut } = req.query
    const mascotas = leer()
    if (nombre) {
      const pet = mascotas.find(m => m.nombre.toLowerCase() === nombre.toLowerCase())
      return res.json(pet || { mensaje: "Mascota no encontrada" })
    }
    if (rut) {
      const list = mascotas.filter(m => m.dueno.rut === rut)
      return res.json(list.length ? list : { mensaje: "No se encontraron mascotas" })
    }
    res.json(mascotas)
  } catch {
    res.status(500).json({ error: "Error al obtener mascotas" })
  }
})

// POST mascota
app.post("/mascotas", (req, res) => {
  const { nombre, raza, edad, dueno } = req.body
  if (!nombre || !raza || !edad || !dueno?.nombre || !dueno?.rut || !dueno?.telefono)
    return res.status(400).json({ error: "Todos los campos son obligatorios" })

  const mascotas = leer()
  mascotas.push({ nombre, raza, edad, dueno })
  guardar(mascotas)
  res.json({ mensaje: "Mascota registrada" })
})

// DELETE mascota
app.delete("/mascotas", (req, res) => {
  const { nombre, rut } = req.query
  if (!nombre && !rut) return res.status(400).json({ error: "Debe enviar nombre o rut" })

  let mascotas = leer()
  if (nombre) mascotas = mascotas.filter(m => m.nombre.toLowerCase() !== nombre.toLowerCase())
  if (rut) mascotas = mascotas.filter(m => m.dueno.rut !== rut)
  guardar(mascotas)
  res.json({ mensaje: "Registro actualizado" })
})


app.listen(PORT, () =>  console.log(`Servidor en http://localhost:${PORT}`));