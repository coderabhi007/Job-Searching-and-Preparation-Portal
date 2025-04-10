import {Router} from "express";
import {Register,Login,resetPassword,googleLogin,googleRegister,isRegisterd} from "../controllers/auth.controllers.js";

const router=Router();
router.route('/register').post(Register);
router.route('/google-register').post(googleRegister);
router.route('/google-login').post(googleLogin);
router.route('/login').post(Login);
router.route('/resetpassword').post(resetPassword);
router.route('/isRegisterd').post(isRegisterd);
export default router;