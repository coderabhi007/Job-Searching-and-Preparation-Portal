import Router from "express";
import { createOrder,verify,paymentFailed} from "../controllers/payment.cntrollers.js";
import { Auth } from "../middelwares/auth.middelware.js";
const router=Router()
router.route('/create-order').post(Auth,createOrder)
router.route('/verify').post(Auth,verify)
router.route('/payment-failed').post(Auth,paymentFailed)
export default router;