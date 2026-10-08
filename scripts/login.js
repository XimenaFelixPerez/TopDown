const loginView = document.getElementById('loginView');
const verifyView = document.getElementById('verifyView');
const loginForm = document.getElementById('loginForm');
const verifyForm = document.getElementById('verifyForm');
const loginError = document.getElementById('loginError');
const verifyError = document.getElementById('verifyError');
const codeSentTo = document.getElementById('codeSentTo');

const post = async (url, body) => {
  const r = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  return { ok: r.ok, data: await r.json() };
};

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  loginError.classList.add('d-none');
  const { ok, data } = await post('/api/login', {
    correo: document.getElementById('employeeNumber').value.trim(),
    contrasena: document.getElementById('password').value
  });
  if (!ok) {
    loginError.textContent = data.mensaje;
    loginError.classList.remove('d-none');
    return;
  }
  codeSentTo.textContent = `Código enviado a ${data.correo}`;
  loginView.classList.add('d-none');
  verifyView.classList.remove('d-none');
});

verifyForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  verifyError.classList.add('d-none');
  const { ok, data } = await post('/api/verificar', {
    codigo: document.getElementById('verificationCode').value.trim()
  });
  if (!ok) {
    verifyError.textContent = data.mensaje;
    verifyError.classList.remove('d-none');
    return;
  }
  window.location.href = data.redirect;
});

document.getElementById('backToLogin').addEventListener('click', (e) => {
  e.preventDefault();
  verifyForm.reset();
  verifyError.classList.add('d-none');
  verifyView.classList.add('d-none');
  loginView.classList.remove('d-none');
});