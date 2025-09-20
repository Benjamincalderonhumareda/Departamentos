let departamentosData = [];

async function cargarDepartamentos() {
  const response = await fetch("departdb.json");
  departamentosData = await response.json();
  mostrarDepartamentos(departamentosData);
}

function mostrarDepartamentos(departamentos) {
  const deptGrid = document.querySelector(".dept-grid");
  deptGrid.innerHTML = "";

  departamentos.forEach((dept) => {
    const deptItem = document.createElement("div");
    deptItem.className = "dept-item";

    deptItem.innerHTML = `
      <img src="${dept.imagen}" alt="${dept.nombre}">
      <div class="dept-info">
        <h4>${dept.nombre}</h4>
        <p>${dept.ciudad} • ${dept.categoria}</p>
        <p>${dept.descripcion}</p>
      </div>
    `;

    deptItem.addEventListener("click", () => {
      mostrarDetallesDepartamento(dept.id);
    });

    deptGrid.appendChild(deptItem);
  });
}

function mostrarDetallesDepartamento(deptId) {
  const dept = departamentosData.find((d) => d.id === deptId);

  document.getElementById("modalImage").src = dept.imagen;
  document.getElementById("modalImage").alt = dept.nombre;
  document.getElementById("modalTitle").textContent = dept.nombre;
  document.getElementById("modalCiudad").textContent = dept.ciudad;
  document.getElementById("modalCategoria").textContent = dept.categoria;
  document.getElementById("modalArea").textContent = dept.area;
  document.getElementById("modalHabitaciones").textContent = dept.habitaciones;
  document.getElementById("modalBanos").textContent = dept.baños;
  document.getElementById("modalParqueaderos").textContent = dept.parqueaderos;
  document.getElementById("modalPrecioActual").textContent =
    dept.precio_actual.toLocaleString();
  document.getElementById("modalPrecioAnterior").textContent =
    dept.precio_anterior.toLocaleString();
  document.getElementById("modalDescripcion").textContent = dept.descripcion;
  document.getElementById(
    "modalMapa"
  ).href = `https://www.google.com/maps?q=${dept.latitud},${dept.longitud}`;

  document.getElementById("deptModal").classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function cerrarModal() {
  document.getElementById("deptModal").classList.add("hidden");
  document.body.style.overflow = "auto";
}

document.addEventListener("DOMContentLoaded", function () {
  cargarDepartamentos();
  document.querySelector(".close-btn").addEventListener("click", cerrarModal);
  document.getElementById("deptModal").addEventListener("click", function (e) {
    if (e.target === this) cerrarModal();
  });
});
