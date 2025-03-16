import {Router} from "express";
import {Register,Login,resetPassword,googleLogin,googleRegister} from "../controllers/auth.controllers.js";
const router=Router();
router.route('/register').post(Register);
router.route('/google-register').post(googleRegister);
router.route('/google-login').post(googleLogin);
router.route('/login').post(Login);
router.route('/resetpassword').post(resetPassword);
export default router;