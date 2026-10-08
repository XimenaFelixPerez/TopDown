export const requiereSesion = (req, res, next) => {
  if (req.session.usuario) return next();
  if (req.originalUrl.startsWith('/api')) {
    return res.status(401).json({ ok: false, mensaje: 'Sesión no válida' });
  }
  res.redirect('/paginas/index.html');
};