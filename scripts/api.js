const API_URL = 'http://localhost:3000/api'; 
async function api(ruta, opciones = {}) {
    const res = await fetch(`${API_URL}${ruta}`, {
        ...opciones,
        headers: { 'Content-Type': 'application/json', ...opciones.headers },
        body: opciones.body ? JSON.stringify(opciones.body) : undefined
    });
    if (!res.ok) throw new Error(`Error ${res.status}`);
    return res.json();
    }