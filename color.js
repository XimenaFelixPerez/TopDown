const COLOR_KEY = "kiosco-color";
const COLOR_DEFECTO = "#2b4bd6";

const colorGuardado = localStorage.getItem(COLOR_KEY) || COLOR_DEFECTO;
document.documentElement.style.setProperty("--portal-color", colorGuardado);

document.addEventListener("DOMContentLoaded", () => {
    const colorDots = document.querySelectorAll(".color-dot");

    colorDots.forEach((dot) => {
        dot.classList.toggle("active", dot.dataset.color === colorGuardado);

        dot.addEventListener("click", () => {
            colorDots.forEach((d) => d.classList.remove("active"));
            dot.classList.add("active");

            const color = dot.dataset.color;
            document.documentElement.style.setProperty("--portal-color", color);
            localStorage.setItem(COLOR_KEY, color);
        });
    });
});