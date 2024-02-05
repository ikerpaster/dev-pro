import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import { isClient } from "../middleware/authAccess.js";
import { createPermission, editPermission, getAllPermissions } from "../controllers/permission.controller.js";

const router = express.Router();

router.get("/all", verifyToken, getAllPermissions);
router.post("/add", verifyToken, createPermission);
router.put("/confm", verifyToken, editPermission);

export default router;

 
