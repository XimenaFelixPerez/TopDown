// ---------- Color del portal ----------
function aplicarColorPortal(color) {
    document.documentElement.style.setProperty('--portal-color', color);
    document.querySelectorAll('.color-dot').forEach(function (punto) {
        punto.classList.toggle('active', punto.dataset.color === color);
    });
}

function inicializarSelectorColor() {
    var puntosColor = document.querySelectorAll('.color-dot');
    var colorGuardado = localStorage.getItem('colorPortal');
    if (colorGuardado) {
        aplicarColorPortal(colorGuardado);
    } else if (puntosColor.length) {
        aplicarColorPortal(puntosColor[0].dataset.color);
    }
    puntosColor.forEach(function (punto) {
        punto.addEventListener('click', function () {
            var color = punto.dataset.color;
            localStorage.setItem('colorPortal', color);
            aplicarColorPortal(color);
        });
    });
}

function inicializarTema() {
    var botonTema = document.getElementById('botonTema');
    var temaGuardado = localStorage.getItem('temaPortal') || 'claro';
    document.body.dataset.theme = temaGuardado === 'oscuro' ? 'dark' : 'light';

    if (!botonTema) return;

    botonTema.addEventListener('click', function () {
        var temaActual = document.body.dataset.theme === 'dark' ? 'oscuro' : 'claro';
        var nuevoTema = temaActual === 'claro' ? 'oscuro' : 'claro';
        document.body.dataset.theme = nuevoTema === 'oscuro' ? 'dark' : 'light';
        localStorage.setItem('temaPortal', nuevoTema);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    inicializarSelectorColor();
    inicializarTema();
});
