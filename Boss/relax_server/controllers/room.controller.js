import Booking from "../models/booking.model.js";
import Hotel from "../models/hotel.model.js";
import Room from "../models/room.model.js";
import User from "../models/user.model.js";
import createError from "../utils/createError.js";

 

export const createRoomListing = async (req, res, next) => {
  const { hotelId, basicInfo, descriptionInfo, locationInfo, amenitiesInfo, selectedFiles, videoInfo,pricingInfo, pricingRulesInfo, availableRules, bookingInfo, termsInfo } = req.body;
  console.log("this is pricingRulesInfo :: ", pricingRulesInfo);

  try {
    const user = await User.findById(req.userId);
    if (!user) return next(createError(404, "User not found"));

    const isHotelExist = await Hotel.findOne({ _id: hotelId, agentId: req.userId }).populate("cheapestRoom");
    if (!isHotelExist) return next(createError(404, "Invalid Hotel"));

 
    const room = await Room.create({
      hotelId,
      agentId: req.userId,
      images:selectedFiles,
      basicInfo,
      descriptionInfo,
      locationInfo,
      amenitiesInfo,
      videoInfo,
      pricingInfo,
      availableRules,
      bookingInfo,
      termsInfo,
      pricingRules:pricingRulesInfo
    });

     // Check if the new room is cheaper than the current cheapest room
     if (!isHotelExist.cheapestRoom || room.pricingInfo.nightPrice < isHotelExist.cheapestRoom.pricingInfo.nightPrice) {
      isHotelExist.cheapestRoom = room._id;
      await isHotelExist.save();
    }

    console.log("this is the room: ", room);
    console.log("backed is receiving your request!");
    await room.save();

    isHotelExist.rooms.push(room._id);
    await isHotelExist.save();

 

    user.rooms.push(room._id);
    await user.save();
    

    res.status(201).json({ message: room });
  } catch (error) {
    next(createError(500, "Something went wrong!!!"));
    console.log(error);
  }
}

// get all rooms
export const getAllRooms = async (req, res, next) => {
  try {
    // console.log("YVAN ",req.userId);
    const rooms = await Room.find().populate('agentId', 'fullName lastName');
    res.status(200).json(rooms)
  } catch (error) {
    next(createError(404, "samething goes wrong"));
  }
}

// get single hotel
export const getSingleRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id).populate('agentId', 'fullName lastName');
    res.status(200).json(room)
  } catch (error) {
    next(createError(404, "samething goes wrong"));
  }
}

// get my room 
export const __getMyRooms = async (req, res, next) => {
  try {
    // check if user is authenaticated 
    const user = await User.findById(req.userId);
    if (!user) {
      return next(createError(404, "unauthorized Access"));
    }

    if (user.role !== 'isAgent') {
      return next(createError(404, "anAUthorized Access"));
    }

    const rooms = await Room.find({ agentId: req.params.id });
    if (!rooms) return next(createError(404, "room notFound"));
    res.status(200).json(rooms)
  } catch (error) {
    next(createError(404, "samething goes wrong"));
  }
}

export const getMyRooms = async (req, res, next) => {
  try {


    if (req.userId !== req.params.id) return next(createError(404, " UnAuthorized Access"));

    const rooms = await Room.find({ agentId: req.params.id }).populate('agentId', 'fullName lastName');;
    if (rooms.length === 0) {
      return next(createError(404, "Rooms not found"));
    }

    res.status(200).json(rooms);
  } catch (error) {
    next(createError(500, "Something went wrong"));
    console.log(error);
  }
};

// delete 
export const deleteRoom = async (req, res, next) => {
  try {

    //  check if hotel is exist 
    const isExist = await Room.findOne({ _id: req.params.id, agentId: req.userId });
    if (!isExist) return next(createError(404, "Room Not FOund Access"));

    await Room.findByIdAndDelete({ _id: req.params.id, agentId: req.userId });
    res.status(200).send("deleted.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error.");
  }
};

// update room 
export const __updateRoom = async (req, res, next) => {
  const { id } = req.params;
  try {
    const { name, description, capacity, price, amenities, images } = req.body;

    const room = await Room.findOneAndUpdate(
      { _id: id, agentId: req.userId },
      {
        name,
        description,
        capacity,
        price,
        amenities,
        images
      },
      { new: true }
    );
    if (!room) {
      return next(createError(404, "Room Not Found"));
    }
    res.status(200).json(room);
  } catch (error) {
    next(createError(500, "samething goes wrong!"));
  }
};


export const updateRoom = async (req, res, next) => {
  const { id } = req.params;
  try {
    const {
      name,
      description,
      capacity,
      price,
      amenities,
      images,
      offer,
      basicInfo,
      descriptionInfo,
      locationInfo,
      amenitiesInfo,
      photosInfo,
      videoInfo,
      pricingInfo,
      availableRules,
      bookingInfo,
      termsInfo,
    } = req.body;

    const room = await Room.findOneAndUpdate(
      { _id: id, agentId: req.userId },
      {
        name,
        description,
        capacity,
        price,
        amenities,
        images,
        offer,
        basicInfo,
        descriptionInfo,
        locationInfo,
        amenitiesInfo,
        photosInfo,
        videoInfo,
        pricingInfo,
        availableRules,
        bookingInfo,
        termsInfo,
      },
      { new: true }
    );
    if (!room) {
      return next(createError(404, "Room Not Found"));
    }
    res.status(200).json(room);
  } catch (error) {
    next(createError(500, "Something went wrong!"));
  }
};

 
export const getOnlyAvailableRooms = async (req, res, next) => {
  const { startDate, endDate } = req.params; // Assuming you are passing the dates in the request body

  try {
    // Find all bookings that overlap with the specified dates
    const overlappingBookings = await Booking.find({
      startDate: { $lte: endDate },
      endDate: { $gte: startDate }
    });

    console.log("booked rooms---::",overlappingBookings);
    // Get the room IDs of the overlapping bookings
    const bookedRoomIds = overlappingBookings.map(booking => booking.roomId);

    // Find all rooms that do not have an overlapping booking
    const availableRooms = await Room.find({
      _id: {
        $not: {
          $in: bookedRoomIds,
        },
      },
    });

    if (!availableRooms || availableRooms.length === 0) {
      return res.status(404).json({ error: "No rooms available for the selected dates" });
    }

    res.status(200).json(availableRooms);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};



