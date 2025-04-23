import { Router } from "express";
import { getData } from "../controllers/evaluation.controllers.js";
const router=new Router()
router.route('/getData/:skill').get(getData);

export default router;