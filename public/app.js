const DOM = {
  mensaje: document.getElementById("mensaje"),
  petList: document.getElementById("petList"),
  forms: {
    register: document.getElementById("formRegister"),
    findName: document.getElementById("formFindName"),
    findRut: document.getElementById("formFindRut"),
    deleteName: document.getElementById("formDeleteName"),
    deleteRut: document.getElementById("formDeleteRut")
  }
}
 document.querySelectorAll(".main-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const target = btn.getAttribute("data-target");
        document.querySelectorAll("section").forEach(s => s.style.display = "none");
        document.getElementById(target).style.display = "block";
        document.getElementById("mensaje").textContent = "";
        document.getElementById("petList").innerHTML = "";
      });
    });

// Helpers
const limpiar = form => form.reset()
const showMessage = (text, type="ok") => {
  DOM.mensaje.textContent = text
  DOM.mensaje.style.color = type==="error" ? "red" : "darkgreen"
}
const showPets = pets => {
  DOM.petList.innerHTML = ""
  if (!Array.isArray(pets)) pets = [pets]
  pets.forEach(p => {
    const li = document.createElement("li")
    li.textContent = `${p.nombre} | ${p.raza} | ${p.edad} años | Dueño: ${p.dueno.nombre} | Rut: ${p.dueno.rut} | Tel: ${p.dueno.telefono}`
    DOM.petList.appendChild(li)
  })
}

// --- REGISTRAR ---
DOM.forms.register.addEventListener("submit", async e => {
  e.preventDefault()
  const data = Object.fromEntries(new FormData(e.target))
  try {
    const {data: mascotas} = await axios.get("/mascotas")
    if (mascotas.find(m => m.nombre === data.nombre))
      return showMessage("Ya existe una mascota con ese nombre", "error")
    if (mascotas.find(m => m.dueno.telefono === data.duenoTelefono))
      return showMessage("Teléfono ya registrado", "error")

    await axios.post("/mascotas", {
      nombre: data.nombre,
      raza: data.raza,
      edad: parseInt(data.edad),
      dueno: { nombre: data.duenoNombre, rut: data.duenoRut, telefono: data.duenoTelefono}
    })
    showMessage("Mascota registrada")
    limpiar(e.target)
  } catch {
    showMessage("Error al registrar", "error")
  }
})

// ---  BUSCAR Y ELIMINAR ---
const buscar = (form, param, msg) => form.addEventListener("submit", async e => {
  e.preventDefault()
  const data = Object.fromEntries(new FormData(e.target))
  try {
    const res = await axios.get("/mascotas", { params: { [param]: Object.values(data)[0] } })
    showPets(res.data)
    limpiar(e.target)
  } catch {
    showMessage(msg, "error")
  }
})
const eliminar = (form, param, msg) => form.addEventListener("submit", async e => {
  e.preventDefault()
  const data = Object.fromEntries(new FormData(e.target))
  try {
    await axios.delete("/mascotas", { params: { [param]: Object.values(data)[0] } })
    showMessage(msg)
    limpiar(e.target)
  } catch {
    showMessage("Error al eliminar", "error")
  }
})

// --- INICIALIZAR ---
buscar(DOM.forms.findName, "nombre", "Mascota no encontrada")
buscar(DOM.forms.findRut, "rut", "No se encontraron mascotas")
eliminar(DOM.forms.deleteName, "nombre", "Mascota eliminada")
eliminar(DOM.forms.deleteRut, "rut", "Mascotas eliminadas")

