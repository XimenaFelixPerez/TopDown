import {Router}  from "express";
const router = Router();
import {login} from "../Controllers/login.Controllers.js";

router.get("/", login);

export default router;