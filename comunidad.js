
const YO = "Carlos Mendoza";

const cumpleHoy = { nombre: "Laura Gómez", depto: "Recursos Humanos" };

const proximosCumples = [
    { nombre: "Roberto Fuentes",  depto: "Operaciones", dias: 3 },
    { nombre: "Sofía Pacheco",    depto: "Ventas",      dias: 7 },
    { nombre: "Miguel Hernández", depto: "Tecnología",  dias: 12 },
];

const otrasPersonas = ["Ana Ríos", "Jorge Palacios"];

const felicitaciones = [
    { de: "Ana Ríos",       para: "Laura Gómez",     cuando: "Hoy",         mensaje: "¡Feliz cumpleaños Laura! Que tengas un día increíble." },
    { de: "Jorge Palacios", para: "Laura Gómez",     cuando: "Hoy",         mensaje: "¡Muchas felicidades! Un gusto trabajar contigo." },
    { de: "Carlos Mendoza", para: "Roberto Fuentes", cuando: "Hace 3 días", mensaje: "¡Felicidades Roberto! Espero que lo pases muy bien." },
];

const noticias = [
    { tipo: "Evento", clase: "tag-evento", titulo: "Evento de integración Q3 — confirma tu asistencia", fecha: "01 Sep 2026", abierta: true,
      cuerpo: "El próximo 13 de septiembre realizaremos nuestro evento trimestral de integración en las instalaciones de Eslabón. Habrá dinámicas, comida y actividades de equipo. Confirma tu participación antes del 5 de septiembre." },
    { tipo: "Comunicado", clase: "tag-comunicado", titulo: "Nueva política de trabajo híbrido — vigente a partir de octubre", fecha: "28 Ago 2026", abierta: false,
      cuerpo: "A partir de octubre se aplicará el nuevo esquema de trabajo híbrido. Consulta con tu supervisor los días de asistencia presencial que te corresponden." },
    { tipo: "Reconocimiento", clase: "tag-reconocimiento", titulo: "Reconocimiento al equipo de Tecnología — Q2 2026", fecha: "15 Ago 2026", abierta: false,
      cuerpo: "Felicitamos al equipo de Tecnología por el cumplimiento de sus objetivos durante el segundo trimestre de 2026." },
    { tipo: "Capacitación", clase: "tag-capacitacion-rosa", titulo: "Apertura de inscripciones — programa de capacitación Q4", fecha: "10 Ago 2026", abierta: false,
      cuerpo: "Ya están abiertas las inscripciones para los cursos del último trimestre del año. Regístrate desde tu portal antes de que se llenen los lugares." },
    { tipo: "Beneficio", clase: "tag-beneficio", titulo: "Beneficio escolar 2026-2027 — apoyo de útiles para hijos de empleados", fecha: "05 Ago 2026", abierta: false,
      cuerpo: "Los empleados con hijos en edad escolar pueden solicitar el apoyo de útiles. Entrega tu solicitud en Recursos Humanos." },
];

const fechasEspeciales = [
    { titulo: "Aniversario de la empresa", fecha: "15 Sep 2026", texto: "12 años de Desarrollo Eslabón. Celebramos juntos." },
    { titulo: "Día de la Independencia",   fecha: "16 Sep 2026", texto: "Día de descanso oficial. Que disfrutes el día." },
    { titulo: "Evento de integración Q3",  fecha: "13 Sep 2026", texto: "Evento presencial. Confirma tu asistencia antes del 5 de septiembre." },
    { titulo: "Cierre de nómina Sep",      fecha: "25 Sep 2026", texto: "Fecha límite de captura de incidencias." },
];

const iniciales = (n) => n.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const modalEl = document.getElementById("modalFelicitacion");
const modalFel = new bootstrap.Modal(modalEl);
const destinatario = document.getElementById("destinatario");
const mensajeFel = document.getElementById("mensajeFel");
const btnEnviarFel = document.getElementById("btnEnviarFel");

[cumpleHoy.nombre, ...proximosCumples.map((p) => p.nombre), ...otrasPersonas].forEach((n) => {
    destinatario.add(new Option(n, n));
});

function abrirFelicitar(nombre) {
    destinatario.value = nombre || cumpleHoy.nombre;
    mensajeFel.value = "";
    btnEnviarFel.disabled = true;
    modalFel.show();
}

mensajeFel.addEventListener("input", () => {
    btnEnviarFel.disabled = mensajeFel.value.trim() === "";
});

btnEnviarFel.addEventListener("click", () => {
    felicitaciones.unshift({
        de: YO,
        para: destinatario.value,
        cuando: "Ahora",
        mensaje: mensajeFel.value.trim(),
    });
    renderMuro();
    modalFel.hide();
    bootstrap.Tab.getOrCreateInstance(document.querySelector('[data-bs-target="#tab-felicitaciones"]')).show();
});

document.getElementById("btnNuevaFel").addEventListener("click", () => abrirFelicitar());
document.getElementById("btnFelicitarHoy").addEventListener("click", () => abrirFelicitar(cumpleHoy.nombre));

document.getElementById("cumpleHoyTitulo").textContent = `${cumpleHoy.nombre} cumple años hoy`;
document.getElementById("cumpleHoyDepto").textContent = cumpleHoy.depto;

const proximosCont = document.getElementById("proximosCumples");
proximosCumples.forEach((p) => {
    const col = document.createElement("div");
    col.className = "col-md-4";
    col.innerHTML = `
        <div class="panel">
            <div class="d-flex align-items-center gap-3 mb-3">
                <div class="avatar-circle avatar-lg">${iniciales(p.nombre)}</div>
                <div>
                    <div class="fw-semibold">${p.nombre}</div>
                    <small class="text-secondary">${p.depto}</small>
                </div>
            </div>
            <div class="d-flex justify-content-between align-items-center">
                <span class="pill-dias">En ${p.dias} días</span>
                <button class="btn btn-link btn-sm p-0 enlace-portal">Felicitar</button>
            </div>
        </div>
    `;
    col.querySelector("button").addEventListener("click", () => abrirFelicitar(p.nombre));
    proximosCont.appendChild(col);
});

const muro = document.getElementById("muroFelicitaciones");

function renderMuro() {
    muro.innerHTML = "";
    felicitaciones.forEach((f) => {
        const card = document.createElement("div");
        card.className = "panel mb-3";
        card.innerHTML = `
            <div class="d-flex align-items-center gap-2 mb-2">
                <div class="avatar-circle avatar-sm">${f.de[0]}</div>
                <span class="small fw-semibold">${f.de} → ${f.para}</span>
                <small class="text-secondary">· ${f.cuando}</small>
            </div>
            <div class="text-secondary">${esc(f.mensaje)}</div>
        `;
        muro.appendChild(card);
    });
}
renderMuro();

const listaNoticias = document.getElementById("listaNoticias");

function renderNoticias() {
    listaNoticias.innerHTML = "";
    noticias.forEach((n) => {
        const card = document.createElement("div");
        card.className = "panel mb-3";
        card.innerHTML = `
            <div class="d-flex align-items-center gap-3">
                <span class="tag-doc ${n.clase}">${n.tipo}</span>
                <span class="fw-semibold flex-grow-1">${n.titulo}</span>
                <small class="text-secondary numero text-nowrap">${n.fecha}</small>
                <button class="btn btn-link btn-sm p-0 enlace-portal">${n.abierta ? "Cerrar" : "Leer"}</button>
            </div>
            ${n.abierta ? `<p class="text-secondary mt-3 mb-0">${n.cuerpo}</p>` : ""}
        `;
        card.querySelector("button").addEventListener("click", () => {
            n.abierta = !n.abierta;
            renderNoticias();
        });
        listaNoticias.appendChild(card);
    });
}
renderNoticias();

const listaFechas = document.getElementById("listaFechas");
fechasEspeciales.forEach((f) => {
    const col = document.createElement("div");
    col.className = "col-md-6";
    col.innerHTML = `
        <div class="panel h-100">
            <div class="d-flex justify-content-between align-items-center mb-2">
                <span class="fw-semibold">${f.titulo}</span>
                <span class="event-date numero">${f.fecha}</span>
            </div>
            <div class="text-secondary">${f.texto}</div>
        </div>
    `;
    listaFechas.appendChild(col);
});