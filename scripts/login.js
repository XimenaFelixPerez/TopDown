
const VALID_EMPLOYEE_NUMBER = "00124@empleado.com";
const VALID_PASSWORD = "12345678";

const loginView = document.getElementById("loginView");
const verifyView = document.getElementById("verifyView");

const loginForm = document.getElementById("loginForm");
const employeeNumber = document.getElementById("employeeNumber");
const password = document.getElementById("password");
const loginError = document.getElementById("loginError");

const verifyForm = document.getElementById("verifyForm");
const verificationCode = document.getElementById("verificationCode");
const backToLogin = document.getElementById("backToLogin");

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const numero = employeeNumber.value.trim();
    const contrasena = password.value.trim();

    if (numero === VALID_EMPLOYEE_NUMBER && contrasena === VALID_PASSWORD) {
        loginError.classList.add("d-none");
        loginView.classList.add("d-none");
        verifyView.classList.remove("d-none");
    } else {
        loginError.classList.remove("d-none");
    }
});

verifyForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const codigo = verificationCode.value.trim();


    console.log("Verificando codigo:", codigo);
    window.location.href = "./dashboard.html";
});

backToLogin.addEventListener("click", (e) => {
    e.preventDefault();
    verifyView.classList.add("d-none");
    loginView.classList.remove("d-none");
});