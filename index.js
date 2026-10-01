import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";
import indexRoutes from "./routes/index.routes.js";
import usersRoutes from "./routes/users.route.js";
import loginRoutes from "./routes/login.route.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.static(__dirname));
app.use(morgan("dev"));

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});