import express from "express";
 
import { verifyToken } from "../middleware/jwt.js";
import { createRoomListing, deleteRoom, getAllRooms, getMyRooms, getSingleRoom, updateRoom,getOnlyAvailableRooms } from "../controllers/room.controller.js";
import { isAgent } from "../middleware/authAccess.js";

const router = express.Router();

router.post("/",verifyToken,isAgent,createRoomListing);
router.get("/",getAllRooms);
router.get('/single/:id',getSingleRoom);
router.get('/myrooms/:id',verifyToken,isAgent,getMyRooms);
router.patch('/edit/:id',verifyToken,isAgent,updateRoom);
router.delete('/:id',verifyToken,isAgent,deleteRoom);
router.get('/only/available/rooms/:startDate/:endDate',getOnlyAvailableRooms);
 




export default router;