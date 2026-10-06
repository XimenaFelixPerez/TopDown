import express from "express";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";


const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/paginas", express.static(path.join(__dirname, "paginas")));
app.use("/scripts", express.static(path.join(__dirname, "scripts")));
app.get("/style.css", (req, res) => {
  res.sendFile(path.join(__dirname, "style.css"));
});

app.get("/", (req, res) => res.redirect("/paginas/index.html"));

app.listen(3000, () => console.log("Servidor en http://localhost:3000"));