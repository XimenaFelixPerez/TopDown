const recibos = [
    { periodo: "Agosto 2026", percepciones: 48000, deducciones: 5160, neto: 42840, fecha: "01 Sep 2026" },
    { periodo: "Julio 2026",  percepciones: 48000, deducciones: 5160, neto: 42840, fecha: "01 Ago 2026" },
    { periodo: "Junio 2026",  percepciones: 48000, deducciones: 5160, neto: 42840, fecha: "01 Jul 2026" },
    { periodo: "Mayo 2026",   percepciones: 46000, deducciones: 5000, neto: 41000, fecha: "01 Jun 2026" },
    { periodo: "Abril 2026",  percepciones: 46000, deducciones: 5000, neto: 41000, fecha: "01 May 2026" },
    { periodo: "Marzo 2026",  percepciones: 46000, deducciones: 5000, neto: 41000, fecha: "01 Abr 2026" },
];

const money = (n) => "$" + n.toLocaleString("es-MX", { minimumFractionDigits: 2 });

const recibosBody = document.getElementById("recibosBody");
const historialLista = document.getElementById("historialLista");
const historialDetalle = document.getElementById("historialDetalle");
const volverHistorial = document.getElementById("volverHistorial");
const detPeriodo = document.getElementById("detPeriodo");
const detFecha = document.getElementById("detFecha");

recibos.forEach((r) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td class="fw-semibold">${r.periodo}</td>
        <td class="numero">${money(r.percepciones)}</td>
        <td class="text-danger numero">-${money(r.deducciones)}</td>
        <td class="fw-semibold numero">${money(r.neto)}</td>
        <td class="numero">${r.fecha}</td>
        <td class="text-end"><button class="btn btn-primary btn-sm ver-recibo">Ver</button></td>
    `;
    row.querySelectorAll(".ver-recibo").forEach((boton) => {
        boton.addEventListener("click", (e) => {
            e.preventDefault();
            detPeriodo.textContent = r.periodo;
            detFecha.textContent = r.fecha;
            historialLista.classList.add("d-none");
            historialDetalle.classList.remove("d-none");
        });
    });
    recibosBody.appendChild(row);
});

volverHistorial.addEventListener("click", (e) => {
    e.preventDefault();
    historialDetalle.classList.add("d-none");
    historialLista.classList.remove("d-none");


});

