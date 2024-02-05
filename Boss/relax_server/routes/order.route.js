import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import { getMyOrders,  confirm, createOrder } from "../controllers/order.controller.js";
 
const router = express.Router();
router.get("/my", verifyToken, getMyOrders);
router.post("/create-payment-intent/:id", verifyToken, createOrder);
router.put("/confm", verifyToken, confirm);

export default router;

 
