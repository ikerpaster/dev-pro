import express from "express";
import { register, login, logout, updatePassword, googleAuth, googleAuthCallback, success, failure, google_logout, adminLogin } from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/jwt.js";
import passport from "passport";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/admin/login",adminLogin);
router.post("/logout", logout);
router.patch('/update_password/', verifyToken, updatePassword);


router.get("/google", googleAuth);
router.get("/google/callback", googleAuthCallback);

router.get("/google/success", success);
router.get("/google/failure", failure);
router.post("/google/logout", google_logout);


export default router;
