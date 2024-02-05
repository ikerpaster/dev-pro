import Hotel from "../models/hotel.model.js";
import User from "../models/user.model.js";
import createError from "../utils/createError.js";


// import Booking from "../models/Booking";
import Booking from "../models/booking.model.js";
import Room from "../models/room.model.js";
import Order from "../models/order.model.js";
import canceledBooking from "../models/canceledBooking.model.js";



export const createBooking = async (req, res, next) => {
  const { roomId,clientId, startDate, endDate, guest } = req.body;

  try {
    // const clientId="6577474bc344e02d8702966b";
    // if (req.userId !== clientId) return next(createError(404, "Unauthorized access"));

    // Check if the room exists and has the capacity for the guests
    const room = await Room.findById(roomId);
    if (!room) return next(createError(404, "Invalid room"));

    if (room.basicInfo.accommodates < guest) return next(createError(404, "Too many guests"));

    // Check if the room is available for the given date range
    // const isRoomAvailable = await Booking.isRoomAvailable(roomId, startDate, endDate);
    // if (!isRoomAvailable) {
    //   return res.status(400).json({ error: "Room is not available for the selected dates" });
    // }

    // Calculate the number of days between the start and end dates
    const startTime = new Date(startDate).getTime();
    const endTime = new Date(endDate).getTime();
    const timeDiff = Math.abs(endTime - startTime);
    const timesNumberOfDaysBetween = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Convert milliseconds to days

    // if(startTime === endTime) {
    //   timesNumberOfDaysBetween = 1;
    // }
    // Calculate the total amount
    const totalAmount = room.pricingInfo.nightPrice * timesNumberOfDaysBetween;


    console.log("room price:", room.pricingInfo.nightPrice);
    console.log("nmber of days:", timesNumberOfDaysBetween);
    console.log("total to pay", totalAmount);

    // Create the booking
    const booking = new Booking({
      roomId,
      clientId,
      guest,
      startDate,
      endDate,
      totalAmount,
    });

    // Save the booking
    await booking.save();

    room.book.push(booking._id);
    await room.save();

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};


// get all my bookings 
export const getMyBookings = async (req, res, next) => {

  try {
    // check if user is authenticated 
    // if (req.userId !== req.params.id) return next(createError(404, "access Denied"));

    const book = await Booking.find({ clientId: req.params.id });
    if (!book) return next(createError(404, "booking not founds"));

    res.status(200).json(book);
  } catch (error) {
    next(createError(500, "Samething Went Wrong"));
  }

}

// get single booking 

export const getSingleBooking = async (req, res, next) => {

  try {
    const booking = await Booking.findOne({ _id: req.params.id, clientId: req.userId });
    if (!booking) return next(createError(404, "Room NotFound "));
    res.status(200).json(booking);
  } catch (error) {
    next(createError(404, "Samething goes wrong on the server"));
  }
}



export const updateMyBooking = async (req, res, next) => {
  // const { startDate, endDate, totalAmount } = req.body;
  const { roomId, clientId, startDate, endDate, guest } = req.body;

  try {

    if (req.userId !== clientId) return next(createError(404, "Unauthorized access"));

    const booking = await Booking.findOne({ _id: req.params.id, clientId: clientId });
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    // check if is paied or not 
    if (booking.status !== 'completed') {

      // start 
      // Check if the room exists and has the capacity for the guests
      const room = await Room.findById(roomId);
      if (!room) return next(createError(404, "Invalid room"));

      if (room.capacity < guest) return next(createError(404, "Too many guests"));


      // Calculate the number of days between the start and end dates
      const startTime = new Date(startDate).getTime();
      const endTime = new Date(endDate).getTime();
      const timeDiff = Math.abs(endTime - startTime);
      const timesNumberOfDaysBetween = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Convert milliseconds to days


      // Calculate the total amount
      const totalAmount = room.price * timesNumberOfDaysBetween;

      // end 

      // Update the booking details
      booking.guest = guest;
      booking.startDate = startDate;
      booking.endDate = endDate;
      booking.totalAmount = totalAmount;

      // Save the updated booking
      await booking.save();

      return res.status(200).json({ message: "Booking updated successfully" });
    } else {
      return res.json({ message: " need another functionaliyyyyyyy " });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


export const myRoomsBooked = async (req, res, next) => {
  try {

    if (req.userId !== req.params.id) return next(createError(404, "Data is not found"));

    const rooms = await Room.find({ agentId: req.userId });
    const roomIds = rooms.map(room => room._id);


    const bookings = await Booking.find({
      roomId: { $in: roomIds }
    });

    res.status(200).json(bookings);
  } catch (error) {
    next(createError(500, "Something went wrong"));
  }
};


export const _cancelBooking = async (req,res,next)=>{

  // check if usser has a paid boolings now 
  try {
    
    const myBook = await Booking.findOne({_id:req.params.id,status:'completed'});
    if(!myBook) return next(createError,(404,"Booking NotFound!"));

    console.log("book tbl: ",myBook);
    // get the owner of the room 
    const roomOwner = await Room.findById(myBook.roomId);
    if(!roomOwner) return next(createError,(404,"Room Owner NotFind"));
    console.log("room tbl : ", roomOwner);
     // check if the authenticated user is the one who perfome this task 
    
     if(req.userId !== myBook.clientId) return next(createError(404,"Access Denied Please!"));

    const cancelbooking = new canceledBooking({
      roomId:myBook.roomId,
      clientId:myBook.clientId,
      agentId:roomOwner.agentId,
      bookId:req.params.id,
      comment:req.body.comment
     
    });

    // Save the booking
   const save =  await cancelbooking.save();
   if(!save) return next(createError(404," notSaved!"));
    res.status(200).json(cancelBooking);
  } catch (error) {
    console.log("this is the error::",error);
    return next(createError(500,"samething Goes Wrong men!"));
    // res.json({message: error}).status(500);
  }
}



export const getAllAvailableRooms = async (req, res, next) => {
  const { startDate, endDate } = req.body;

  try {
 
    const room = await Room.find();
    if (!room) return next(createError(404, "Invalid room"));
 
    const isRoomAvailable = await Booking.isAllRoomAvailable( startDate, endDate);
    if (!isRoomAvailable) {
      return res.status(400).json({ error: "Room is not available for the selected dates" });
    }


    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
