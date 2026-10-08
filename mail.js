import 'dotenv/config';
import nodemailer from 'nodemailer';

const transporter = process.env.SMTP_USER
  ? nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    })
  : null;

export const enviarCodigo = async (destino, codigo) => {
  if (!transporter) {
    console.log(`Código 2FA para ${destino}: ${codigo}`);
    return;
  }
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: destino,
    subject: 'Tu código de verificación',
    text: `Tu código es ${codigo}. Expira en 5 minutos.`
  });
};