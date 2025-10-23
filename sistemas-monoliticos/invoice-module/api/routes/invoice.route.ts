import { Router } from "express";
import InvoiceController from "../controllers/invoice.controller";

const router = Router();

router.get("/:id", InvoiceController.findInvoice);

export default router;

