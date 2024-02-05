import express from "express";
 
import { verifyToken } from "../middleware/jwt.js";
import { createHotelListing, deleteHotel, getListingsHotels, getMyHotels, getSingleHotel, updateHotel } from "../controllers/hotel.controller.js";
import { isAgent } from "../middleware/authAccess.js";
 

const router = express.Router();

router.post("/",verifyToken,isAgent,createHotelListing);
router.get('/all',getListingsHotels);
router.get('/single/:id',getSingleHotel);
router.get('/myhotels/:id',verifyToken,isAgent,getMyHotels);
router.patch('/edit/:id',verifyToken,isAgent,updateHotel);
router.delete('/:id',verifyToken,isAgent,deleteHotel);
 

export default router;
