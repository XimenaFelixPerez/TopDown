import "dotenv/config";
import express from "express";
import morgan from "morgan";
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";
//import noticiasRoutes from "./routes/noticias.routes.js";
import loginRoutes from "./routes/login.route.js";
import { requiereSesion } from "./middleware/auth.js";

console.log("SECRET:", process.env.SESSION_SECRET);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();


app.use(morgan("dev"));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: { maxAge: 5 * 60 * 1000, httpOnly: true, sameSite: "lax" }
}));

app.use("/api", loginRoutes);
//app.use("/api/noticias", requiereSesion, noticiasRoutes);

app.get("/paginas/index.html", (req, res, next) => {
  if (req.session.usuario) return res.redirect("/paginas/Dashboard.html");
  next();
});

app.use(
  "/paginas",
  (req, res, next) => (req.path === "/index.html" ? next() : requiereSesion(req, res, next)),
  express.static(path.join(__dirname, "paginas"))
);
app.use("/scripts", express.static(path.join(__dirname, "scripts")));
app.get("/style.css", (req, res) => {
  res.sendFile(path.join(__dirname, "style.css"));
});

app.get("/", (req, res) => res.redirect("/paginas/index.html"));

app.listen(3000, () => console.log("Servidor en http://localhost:3000"));