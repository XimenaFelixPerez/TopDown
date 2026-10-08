import crypto from 'crypto';
import { pool, sql } from '../db.js';
import { enviarCodigo } from '../mail.js';

const enmascarar = (correo) => {
  const [usuario, dominio] = correo.split('@');
  return `${usuario[0]}***@${dominio}`;
};

export const login = async (req, res) => {
  const { correo, contrasena } = req.body;
  if (!correo || !contrasena) {
    return res.status(400).json({ ok: false, mensaje: 'Datos incompletos' });
  }
  try {
    const r = await pool.request()
      .input('correo', sql.VarChar, correo)
      .input('contrasena', sql.VarChar, contrasena)
      .query('SELECT Id, Nombre, Correo FROM dbo.Usuarios WHERE Correo = @correo AND Contrasena = @contrasena');
    if (r.recordset.length === 0) {
      return res.status(401).json({ ok: false, mensaje: 'Correo de empleado o contraseña incorrectos.' });
    }
    const u = r.recordset[0];
    const codigo = crypto.randomInt(100000, 1000000).toString();
    req.session.pendiente = {
      id: u.Id,
      nombre: u.Nombre,
      correo: u.Correo,
      codigo,
      intentos: 0,
      expira: Date.now() + 5 * 60 * 1000
    };
    await enviarCodigo(u.Correo, codigo);
    res.json({ ok: true, correo: enmascarar(u.Correo) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, mensaje: 'Error del servidor' });
  }
};

export const verificar = (req, res) => {
  const p = req.session.pendiente;
  if (!p) {
    return res.status(401).json({ ok: false, mensaje: 'Inicia sesión de nuevo' });
  }
  if (Date.now() > p.expira || p.intentos >= 3) {
    delete req.session.pendiente;
    return res.status(401).json({ ok: false, mensaje: 'Código expirado, inicia sesión de nuevo' });
  }
  if (req.body.codigo !== p.codigo) {
    p.intentos++;
    return res.status(401).json({ ok: false, mensaje: 'Código incorrecto' });
  }
  req.session.usuario = { id: p.id, nombre: p.nombre, correo: p.correo };
  delete req.session.pendiente;
  res.json({ ok: true, redirect: '/paginas/Dashboard.html' });
};

export const sesion = (req, res) => {
  res.json({ ok: true, usuario: req.session.usuario });
};

export const logout = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.json({ ok: true });
  });
};