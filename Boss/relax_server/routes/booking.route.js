import express from "express";
 
import {  createBooking, getMyBookings,getSingleBooking ,myRoomsBooked,updateMyBooking} from "../controllers/booking.controller.js";
 
const router = express.Router();

router.post("/",createBooking);
router.get('/single/:id',getSingleBooking);
router.get('/my/:id',getMyBookings);
router.patch('/edit/:id',updateMyBooking);
router.get("/my/rooms/booked/:id",myRoomsBooked);


export default router;