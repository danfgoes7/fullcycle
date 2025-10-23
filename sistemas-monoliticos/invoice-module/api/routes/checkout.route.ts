import { Router } from "express";
import CheckoutController from "../controllers/checkout.controller";

const router = Router();

router.post("/", CheckoutController.processCheckout);

export default router;

