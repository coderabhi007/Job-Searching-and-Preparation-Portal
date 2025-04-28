import { Router } from "express";
import { getData,setData,getMarks,getTopRankedStudents } from "../controllers/evaluation.controllers.js";
import { Auth } from "../middelwares/auth.middelware.js";

const router=new Router()
router.route('/getData/:skill').get(getData);
router.route('/setData/:skill').post(setData)
router.route('/getMarks').get(Auth,getMarks)
router.route('/getTopRankedStudents').post(Auth,getTopRankedStudents)
export default router;