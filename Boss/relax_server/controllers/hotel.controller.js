import Hotel from "../models/hotel.model.js";
import Property from "../models/properties.model.js";
import rentalsModel from "../models/rentals.model.js";
import User from "../models/user.model.js";
import createError from "../utils/createError.js";


// create hotels 
export const createHotelListing = async (req, res, next) => {

    const { name, type, description, country, state, city, zipcode, images } = req.body;

    try {

        const user = await User.findById(req.userId);
        if (!user) return next(createError(404, "Agent NotFound"));

        const savedHotel = new Hotel({
            name,
            description,
            agentId: req.userId,
            images,
            type,
            location: {
                country: country,
                state: state,
                city: city,
                zipcode: zipcode
            }
        });

        await savedHotel.save();

        user.hotels.push(savedHotel._id);
        await user.save();

        res.status(201).json({ message: savedHotel });
    } catch (error) {
        next(createError(404, "samething goes wrong!!!"));
        console.log(error);
    }

}

 
export const getListingsHotels = async (req, res, next) => {
    try {
      const rooms = await rentalsModel.find();
      res.status(200).json(rooms)
    } catch (error) {
      next(createError(404, "samething goes wrong"));
    }
  }



// get single hotel and rooms in that hotel
export const getSingleHotel = async (req, res, next) => {
    try {
        const hotels = await Hotel.findById(req.params.id).populate("rooms").populate("cheapestRoom");

        if (!hotels) return next(createError(404, "Hotel NotFound"));
        res.status(200).json(hotels)
    } catch (error) {
        next(createError(404, "samething goes wrong"));
    }
}

// get my hotels 
export const getMyHotels = async (req, res, next) => {
    try {

        if (req.userId !== req.params.id) return next(createError(404, " UnAuthorized Access"));

        const hotels = await Hotel.find({ agentId: req.params.id }).populate("rooms");
        if (!hotels) return next(createError(404, "hotels notFound"));
        res.status(200).json(hotels)
    } catch (error) {
        next(createError(404, "samething goes wrong"));
    }
}



// Update a hotel
export const updateHotel = async (req, res) => {
    //   const { hotelId } = req.params;
    const { name, description, location, agentId } = req.body;

    try {

        const hotel = await Hotel.findByIdAndUpdate(
            { _id: req.params.id, agentId: req.userId },
            {
                name,
                description,
                location,
                agentId,
            },
            { new: true }
        );

        if (!hotel) {
            return res.status(404).json({ error: "Hotel not found" });
        }

        res.json(hotel);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};



// delete 
export const deleteHotel = async (req, res, next) => {
    try {

        //  check if hotel is exist 
        const isExist = await Hotel.findOne({ _id: req.params.id, agentId: req.userId });
        if (!isExist) return next(createError(404, "UnAutorized Access"));

        await Hotel.findByIdAndDelete({ _id: req.params.id, agentId: req.userId });
        res.status(200).send("deleted.");
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error.");
    }
};




