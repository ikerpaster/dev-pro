import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import {
  createReview,
  getReviews,
  deleteReview,
} from "../controllers/review.controller.js";
import { isClient } from "../middleware/authAccess.js";

const router = express.Router();

router.post("/", verifyToken, createReview );
router.get("/:hotelId", getReviews );
router.delete("/delete/:id",verifyToken,isClient, deleteReview);

export default router;
