import {Router} from "express";
import {Register,Login,resetPassword} from "../controllers/auth.controllers.js";
const router=Router();
router.route('/register').post(Register);
router.route('/login').post(Login);
router.route('/resetpassword').post(resetPassword);
export default router;