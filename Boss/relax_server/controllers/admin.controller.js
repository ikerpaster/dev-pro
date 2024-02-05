import Property from "../models/properties.model.js";
import Room from "../models/room.model.js";
import User from "../models/user.model.js";
import createError from "../utils/createError.js";
import bcrypt from "bcrypt";
import Booking from "../models/booking.model.js";
import Conversation from "../models/conversation.model.js";
import PropertyType from "../models/propertyType.model.js";
import RoomType from "../models/roomType.model.js"
import BedType from "../models/bedType.model.js";
import Amenities from "../models/amenities.model.js";
import DeletedUser from "../models/archive/deleted_user.model.js";
import creditCardsModel from "../models/creditCards.model.js";
import billingModel from "../models/billing.model.js";
import Department from "../models/department.model.js";
import { generateRandomID } from "../utils/generateRandomID.js";
import Position from "../models/position.model.js";
import Roles from "../models/roles.model.js";
import Permission from "../models/permissions.model.js";
import AmenitiesCategory from "../models/amenitiesCategory.model.js";
import amenitiesCategoryModel from "../models/amenitiesCategory.model.js";
import PropertyCategory from "../models/propertyCategory.model.js";
import rentalsModel from "../models/rentals.model.js";
import roomCategoryModel from "../models/roomCategory.model.js";


// --------------------USERS----------------------
// get all users 
export const getAllUser = async (req, res, next) => {
  try {
    const allUser = await User.find().select("-password").populate("rooms").populate("hotels").populate("book").populate("conversation");
    // const allUser = await User.find();
    if (!allUser) return next(createError(404, "Error to get all users"));

    res.status(200).json(allUser);
  } catch (error) {
    next(createError(500, "samething goes wrong on the server"));
  }

}

export const getAllDeletedUser = async (req,res,next) => {
  try {
    const allUser = await DeletedUser.find().select("-password").populate("rooms").populate("hotels").populate("book").populate("conversation");
    if (!allUser) return next(createError(404, "Error to get all users"));

    res.status(200).json(allUser);
  } catch (error) {
    next(createError(500, "samething goes wrong on the server"));
  }
}

// get single user 
export const getSIngleUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password").populate("rooms").populate("hotels").populate("book").populate("conversation");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
// delete user 
export const __deleteUser = async (req, res, next) => {

  console.log("user delete received ");
  try {
    const userInfo = await User.findById(req.params.id);

    if (!userInfo) {
      return res.status(404).json({ message: 'User not found' });
    }

 
    const newDeletedUser = new DeletedUser({
      userId: userInfo._id,
      username: userInfo.username,
      firstName: userInfo.firstName,
      nickName: userInfo.nickName,
      lastName: userInfo.lastName,
      isCardSaved: userInfo.isCardSaved,
      phone: userInfo.phone,
      mobile: userInfo.mobile,
      profile: userInfo.profile,
      country: userInfo.country,
      state: userInfo.state,
      city: userInfo.city,
      address1: userInfo.address1,
      address2: userInfo.address2,
      zipCode: userInfo.zipCode,
      email: userInfo.email,
      password: userInfo.password,
      role: userInfo.role,
      status: userInfo.status,
      documentIDs: userInfo.documentIDs,
      documentIDsE: userInfo.documentIDsE,
      department: userInfo.department,
      position: userInfo.position,
      workMobile: userInfo.workMobile,
      telephone: userInfo.telephone,
      branch: userInfo.branch,
      workLocation: userInfo.workLocation,
      joiningDate: userInfo.joiningDate,
      contract: userInfo.contract,
      employeeType: userInfo.employeeType,
      workPermitNo: userInfo.workPermitNo,
      workPermitExpiry: userInfo.workPermitExpiry,
      visaNo: userInfo.visaNo,
      visaExpiry: userInfo.visaExpiry,
      emiratesIdNo: userInfo.emiratesIdNo,
      passportNo: userInfo.passportNo,
      passportExpiry: userInfo.passportExpiry,
      // lineManager:" userInfo.lineManager",
      lineManager: '6577474bc344e02d8702966b',
      nationality: userInfo.nationality,
      gender: userInfo.gender,
      language: userInfo.language,
      maritalStatus: userInfo.maritalStatus,
      dateOfBirth: userInfo.dateOfBirth,
      placeOfBirth: userInfo.placeOfBirth,
      numOfChildren: userInfo.numOfChildren,
      homeAddress: userInfo.homeAddress,
      academicLevel: userInfo.academicLevel,
      fieldOfStudy: userInfo.fieldOfStudy,
      school: userInfo.school,
      privateMobile: userInfo.privateMobile,
      privateEmail: userInfo.privateEmail,
      emergencyContactName: userInfo.emergencyContactName,
      emergencyContactNumber: userInfo.emergencyContactNumber,
      notes: userInfo.notes,
      countryBank: userInfo.countryBank,
      password: userInfo.password,
      socialMedia: userInfo.socialMedia,
      authMethod: userInfo.authMethod,
      rooms: userInfo.rooms,
      hotels: userInfo.hotels,
      book: userInfo.book,
      conversation: userInfo.conversation,
      isActive: userInfo.isActive,
      isVerified: userInfo.isVerified,
      ID: userInfo.ID,
      creditCard: userInfo.creditCard,
      bankInfo: userInfo.bankInfo,
    });

    await newDeletedUser.save(); // Save user info to DeletedUser model

    await User.findByIdAndDelete(req.params.id); // Delete user from User model

    if (userInfo.role === 'isAdmin') {
      try {
        // Update credit cards that match the userId
        const updatedCreditCards = await creditCardsModel.updateMany(
          { userId: req.params.id },
          { $set: { status: 'removed' } }
        );
    
        // Update billing information that matches the userId
        const updatedBillingInfo = await billingModel.updateMany(
          { userId: req.params.id },
          { $set: { status: 'removed' } }
        );
    
        // Check if any documents were updated
        if (updatedCreditCards.nModified === 0 && updatedBillingInfo.nModified === 0) {
          return res.status(404).json({ message: 'No credit cards or billing information found for the user' });
        }
    
        return res.status(200).json({ message: 'Credit cards and billing information updated successfully' });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
      }
    }
    
    
  

    return res.status(200).json({ message: 'User Deleted' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteUser = async (req, res, next) => {
  console.log("user delete received ",req.params.id);
  try {
    const userInfo = await User.findById(req.params.id);

    if (!userInfo) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newDeletedUser = new DeletedUser({ ...userInfo._doc });

    await newDeletedUser.save();
    await User.findByIdAndDelete(req.params.id);

    if (userInfo.role === 'isAdmin') {
      try {
        const updatedCreditCards = await creditCardsModel.updateMany(
          { userId: req.params.id },
          { $set: { status: 'removed' } }
        );

        const updatedBillingInfo = await billingModel.updateMany(
          { userId: req.params.id },
          { $set: { status: 'removed' } }
        );

        if (updatedCreditCards.nModified === 0 && updatedBillingInfo.nModified === 0) {
          return res.status(404).json({ message: 'No credit cards or billing information found for the user' });
        }

        return res.status(200).json({ message: 'Credit cards and billing information updated successfully' });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
      }
    }

    return res.status(200).json({ message: 'User Deleted' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// edit user 
export const editUser = async (req, res, next) => {

  const { fullName, lastName, username, email, password, role, phone } = req.body;

  try {
    // Check if password meets criteria
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{3,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ message: "Password must contain at least 3 characters, including at least one letter, one number, and one special character (@$!%*#?&)." });
    }

    const user = await User.findById(req.params.id);

    const hash = bcrypt.hashSync(password, 5);
    user.fullName = fullName;
    user.lastName = lastName;
    user.username = username;
    user.email = email;
    user.password = hash;
    user.role = role;
    user.phone = phone;

    await user.save();

    res.status(200).json(user);

  } catch (error) {
    return res.status(500).json({ error: 'Error updating user' });
  }
}

export const blockUser = async (req, res, next) => {

  try {


    const user = await User.findById(req.params.id);
    // check if the user is not valid or not valid 
    if (!user) return next(createError(404, "User notFound!"));


    user.isActive = false;

    await user.save();

    res.status(200).json({ message: "user is blocked" });

  } catch (error) {
    return res.status(500).json({ error: 'Error updating user' });
  }
}

// Line Managers 
export const getLineManagers = async (req, res, next) => {
  try {
    const admins = await User.find({ role: 'isAdmin' }).select('_id firstName lastName');

    if (!admins) {
      return next(createError(404, "Error fetching admin users"));
    }

    res.status(200).json(admins);
  } catch (error) {
    next(createError(500, "Something went wrong on the server"));
  }
};

//  -------------hotels-----------------
// create hotel 
export const createHotelListing = async (req, res, next) => {
  const { data } = req.body;

  // type, name, description, country, state, city, zipcode, images
  console.log("HOTELS DATA:", data);
  try {
    // const role = "isAgent";
    // check if agent is exist 
    const userID = "6577474bc344e02d8702966b";

    const user = await User.findById(userID);
    if (!user) return next(createError(404, "Agent NotFound"));


    const savedHotel = new Property({
      agentId:userID,
      ID: generateRandomID('PR'),
      ...data,
    });

    console.log("before save ");
    await savedHotel.save();
    console.log("After save ");

    user.hotels.push(savedHotel._id);
   const savedPro =  await user.save();

console.log("SAVED:: ",savedHotel);

    // res.status(201).json({ message: savedHotel });
    if (savedPro) {
      return res.status(201).json({ message: 'Property Created Successfully' });
    }
    console.log("success")
  } catch (error) {
    console.log(error);
   return next(createError(404, "1samething goes wrong!!!"));
  }

}

// get all  properties 
export const getAllProperiesListing = async (req, res, next) => {
  try {
    const pro = await Property.find();
    res.status(200).json(pro)
  } catch (error) {
    next(createError(404, "samething goes wrong"));
  }
}


// get hotels belongs to agent 
export const getHotelsByAgent = async (req, res, next) => {
  try {
    const hotels = await Property.find({ agentId: req.params.id });
    if (!hotels) return next(createError(404, "hotels notFound"));
    res.status(200).json(hotels)
  } catch (error) {
    next(createError(404, "samething goes wrong"));
  }
}

export const editHotel = async (req, res, next) => {

  const { name, description, location, agentId } = req.body;

  try {


    const hotel = await Property.findByIdAndUpdate(
      { _id: req.params.id },
      {
        name,
        description,
        location,
        agentId,
      },
      { new: true }
    );

    if (!hotel) {
      return res.status(404).json({ error: "Property not found" });
    }

    res.json(hotel);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export const deleteHotel = async (req, res, next) => {
  try {
    //  check if hotel is exist 
    const isExist = await Property.findById(req.params.id);
    if (!isExist) return next(createError(404, "Property NotFound"));

    await Property.findByIdAndDelete({ _id: req.params.id });
    res.status(200).send("deleted.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error.");
  }
};



//   ------------------ROOMS ---------------------------

export const createRoomListing = async (req, res, next) => {
  // const { agentId, name, description, capacity, price, amenities, images, offer } = req.body;
  const {data} = req.body;

  try {
    // Check if user is authenticated and authorized
    // const hotel = await Property.findById(req.params.id);
    // if (!hotel) {
    //   return next(createError(404, "Property not found"));
    // }

    console.log("THE DONE::: ", data);

//  console.log("this is the all DONE:: ", data);
const admin = '6577474bc344e02d8702966b';
const room = await Room.create({
   ...data,
   agentId: admin,
   ID:generateRandomID('R'),
});

 const saved =  await room.save();
 console.log("SAVEDINFO:: ",saved);
    // user.rooms.push(room._id);
    // await user.save();
  return  res.status(201).json({ message: "Success" });
  } catch (error) {
    console.log("the erroris:: ", error);
    next(createError(500, "Something went wrong"));
  }
};

export const getAllRoomListing = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms)
  } catch (error) {
    next(createError(404, "samething goes wrong"));
  }
}

export const deleteRoom = async (req, res, next) => {
  try {
    const checkRoom = await Room.findById(req.params.id);
    if (!checkRoom) return (createError(404, "Room NotFound"));
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) return (createError(404, "Room NotFound try again later"));
  res.status(200).send("room deleted!.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error.");
  }
};

export const getSingleRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id).populate('book');
    if (!room) return createError(404, "Room NotFound");
    res.status(200).json(room)
  } catch (error) {
    next(createError(404, "samething goes wrong"));
  }
}

 

export const updateRoom = async (req, res, next) => {

  try {
    const { name, description, capacity, price, amenities, images } = req.body;
    const room = await Room.findOneAndUpdate(
      { _id: req.params.id },
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




//   ------------------RENTALS ---------------------------

export const createRentalsListing = async (req, res, next) => {
  // const { agentId, name, description, capacity, price, amenities, images, offer } = req.body;
  const {data} = req.body;

  try {
 
    console.log("THE DONE REtnals xxx::: ", data);

//  console.log("this is the all DONE:: ", data);
const admin = '6577474bc344e02d8702966b';
const rentals = await rentalsModel.create({
  agentId: admin,
  ID:generateRandomID('PR'),
  ...data,
});

   const saved =  await rentals.save();
 console.log("SAVEDINFO:: ",saved);
 
    return res.status(201).json({ message: "Success" });
  } catch (error) {
    console.log("the erroris:: ", error);
    next(createError(500, "Something went wrong"));
  }
};

export const getAllRentalsListing = async (req, res, next) => {
  try {
    const rooms = await rentalsModel.find().populate(['ProType', 'ProCategory']);
    res.status(200).json(rooms)
  } catch (error) {
    next(createError(404, "samething goes wrong"));
  }
}

export const deleteRentals = async (req, res, next) => {
  try {
    const checkRoom = await rentalsModel.findById(req.params.id);
    if (!checkRoom) return (createError(404, "Room NotFound"));
    const room = await rentalsModel.findByIdAndDelete(req.params.id);
    if (!room) {
      return res.status(200).json({message:"Property NotFound Pls Try Again Later."});
    }

   return res.status(200).json({message:"Rental deleted!."});
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error.");
  }
};

export const getSingleRentas = async (req, res, next) => {
  try {
    const room = await rentalsModel.findById(req.params.id).populate('book');
    if (!room) return createError(404, "Rental NotFound");
    res.status(200).json(room)
  } catch (error) {
    next(createError(404, "samething goes wrong"));
  }
}

export const updateRentals = async (req, res, next) => {

 
};





//   --------------------BOOKINGS------------------

export const createBooking = async (req, res, next) => {
  const { roomId, startDate, endDate, guest } = req.body;

  try {

    // Check if the room exists and has the capacity for the guests
    const room = await Room.findById(roomId);
    if (!room) return next(createError(404, "Invalid room"));

    //   check the agent is is exist 
    const user = await User.findById(req.params.id);
    if (!user) return next(createError(404, " Client NotFound"));


    if (room.capacity < guest) return next(createError(404, "Too many guests"));

    // Check if the room is available for the given date range
    const isRoomAvailable = await Booking.isRoomAvailable(roomId, startDate, endDate);
    if (!isRoomAvailable) {
      return res.status(400).json({ error: "Room is not available for the selected dates" });
    }

    // Calculate the number of days between the start and end dates
    const startTime = new Date(startDate).getTime();
    const endTime = new Date(endDate).getTime();
    const timeDiff = Math.abs(endTime - startTime);
    const timesNumberOfDaysBetween = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Convert milliseconds to days

    // if(startTime === endTime) {
    //   timesNumberOfDaysBetween = 1;
    // }
    // Calculate the total amount
    const totalAmount = room.price * timesNumberOfDaysBetween;


    console.log("room price:", room.price);
    console.log("nmber of days:", timesNumberOfDaysBetween);
    console.log("total to pay", totalAmount);

    // Create the booking
    const booking = new Booking({
      roomId,
      clientId: req.params.id,
      guest,
      startDate,
      endDate,
      totalAmount,
    });

    // Save the booking
    await booking.save();

    room.book.push(booking._id);
    await room.save();

    user.book.push(booking._id);
    await user.save();

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings)
  } catch (error) {
    next(createError(404, "samething goes wrong"));
  }
}
export const getSingleBooking = async (req, res, next) => {

  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return next(createError(404, "Booking NotFound "));
    res.status(200).json(booking);
  } catch (error) {
    next(createError(404, "Samething goes wrong on the server"));
  }
}

export const updateBooking = async (req, res, next) => {
  // const { startDate, endDate, totalAmount } = req.body;
  const { roomId, clientId, startDate, endDate, guest } = req.body;

  try {

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    //   check if client is exist 
    const user = await User.findById(clientId);
    if (!user) return next(createError(404, "Client NotFound"));

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
      booking.clientId = clientId;
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

export const deleteBooking = async (req, res, next) => {
  try {
    const book = await Booking.findByIdAndDelete(req.params.id);
    if (!book) return next(createError(404, "Booking NotFound"));

    res.status(200).send("Booking deleted.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error.");
  }
};


// ------------------MESSAGES------------------------------

export const getAllConversation = async (req, res, next) => {
  try {
    const conv = await Conversation.find();
    res.status(200).json(conv);
  } catch (error) {
    next(createError(404, "samething goes wrong"));
  }
}





// -------------------NOTIFICATIONS----------------------------



// -----------------------PROPERTY TYPE--------------------------------

// Create Property Type
export const createPropertyType = async (req, res, next) => {
  try {
    const { status,name, description } = req.body;

    // Validation: Ensure name and status are provided
    // if (!name) {
    //   return res.status(400).json({ error: "Name and status are required." });
    // }

    const newPropertyType = new PropertyType({
      name,
      description,
      status,
      ID: generateRandomID('PT'),
    });

    const savedPropertyType = await newPropertyType.save();

   return res.status(201).json({message:"property Type succesfully created!"});
  } catch (error) {
    next(createError(500, "Something went wrong"));
  }
};

// Get all property types
export const getAllProType = async (req, res, next) => {
  try {
    const propertyTypes = await PropertyType.find();
    res.status(200).json(propertyTypes);
  } catch (error) {
    next(createError(500, "Something went wrong"));
  }
};

// Get single property type
export const getSingleProType = async (req, res, next) => {
  try {
    const { id } = req.params;

    const propertyType = await PropertyType.findById(id);
   
    if(!propertyType) return next(createError(404,"Invalid Property Type"));

    res.status(200).json(propertyType);
  } catch (error) {
    next(createError(500, "Something went wrong"));
    console.log(" error",error);
  }
};

// Update a property type
export const updateProType = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, status } = req.body;

    // Validation: Ensure name and status are provided
    // if (!name || !status) {
    //   return res.status(400).json({ error: "Name and status are required." });
    // }

    const updatedPropertyType = await PropertyType.findByIdAndUpdate(
      id,
      {
        name,
        description,
        status,
      },
      { new: true }
    );

    if (!updatedPropertyType) {
      return res.status(404).json({ error: "Property type not found." });
    }

    res.status(200).json(updatedPropertyType);
  } catch (error) {
    next(createError(500, "Something went wrong"));
  }
};

// Delete a property type
export const deleteProType = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedPropertyType = await PropertyType.findByIdAndDelete(id);

    if (!deletedPropertyType) {
      return res.status(404).json({ error: "Property type not found." });
    }

    res.status(200).json({ message: "Property type deleted successfully." });
  } catch (error) {
    next(createError(500, "Something went wrong"));
  }
};




// -----------------------PROPERTY CATEGORY--------------------------------

// Create Property Type
export const createPropertyCategory = async (req, res, next) => {
  try {
    const { name, proType, status,subCatego } = req.body;

    // Validation: Ensure name and status are provided
    if (!name) {
      return res.status(400).json({ error: "Name and status are required." });
    }

    const propertyTypes = await PropertyType.findById(proType);
    if(!propertyTypes){
      return res.status(400).json({message:"Invalid Property Type"});
    }

    const newPropertyType = new PropertyCategory({
      name,
      subCatego,
      proType,
      status,
      ID: generateRandomID('PC'),
    });

    const savedPropertyType = await newPropertyType.save();

    propertyTypes.category.push(savedPosition._id);
    await propertyTypes.save();

 
   return res.status(201).json({message:" Propery Category Created Succesfully"});
  } catch (error) {
    next(createError(500, "Something went wrong"));
  }
};



// Get all property types List
export const getAllProCategoryList = async (req, res, next) => {
  const { id } = req.params;
  try {
    const propertyTypes = await PropertyCategory.find({proType: id});
    res.status(200).json(propertyTypes);
  } catch (error) {
    next(createError(500, "Something went wrong"));
  }
};

 
export const getAllProCategory = async (req, res, next) => {
  try {
    const propertyTypes = await PropertyCategory.find();
    res.status(200).json(propertyTypes);
  } catch (error) {
    next(createError(500, "Something went wrong"));
  }
};



// Get single property type
export const getSingleProCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const propertyType = await PropertyCategory.findById(id);
   
    if(!propertyType) return next(createError(404,"Invalid Property Type"));

    res.status(200).json(propertyType);
  } catch (error) {
    next(createError(500, "Something went wrong"));
    console.log(" error",error);
  }
};

// Update a property type
export const updateProCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, proType, status,subCatego } = req.body;

    // Validation: Ensure name and status are provided
    // if (!name || !status) {
    //   return res.status(400).json({ error: "Name and status are required." });
    // }

    console.log("name::", name);
    console.log("type: ", proType);
    console.log("status::", status);


    const updatedPropertyType = await PropertyCategory.findByIdAndUpdate(
      id,
      {
        name,
        proType,
        status,
        subCatego,
      },
      { new: true }
    );

  

    if (!updatedPropertyType) {
      return res.status(404).json({ error: "Property category not found." });
    }

   return res.status(200).json({message:"property category is updated succefully"}); 
  } catch (error) {
    next(createError(500, "Something went wrong"));
  }
};

// Delete a property type
export const deleteProCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedPropertyType = await PropertyCategory.findByIdAndDelete(id);

    if (!deletedPropertyType) {
      return res.status(404).json({ error: "Property category not found." });
    }

    res.status(200).json({ message: "Property Category deleted successfully." });
  } catch (error) {
    next(createError(500, "Something went wrong"));
  }
};





//  ----------------------------ROOM TYPE SECTION ----------------------------------------- 
// Create Room Type
export const createRoomType = async (req, res, next) => {
  try {
    const { name, description, status } = req.body;

    // Validation: Ensure name and status are provided
    if (!name || !status) {
      return res.status(400).json({ error: "Name and status are required." });
    }

    const newRoomType = new RoomType({
      ID:generateRandomID('RT'),
      name,
      description,
      status,
    });

    const savedRoomType = await newRoomType.save();

    if (savedRoomType) {
      return res.status(201).json({ message: "Room Type Created Succesfully." });
    }

    // res.status(201).json(savedRoomType);
  } catch (error) {
    console.log("ikibazooo:: ", error);
    next(createError(500, "Something went wrong"));
  }
};

// Get all room types
export const getAllRoomTypes = async (req, res, next) => {
  try {
    const roomTypes = await RoomType.find();
    res.status(200).json(roomTypes);
  } catch (error) {
    next(createError(500, "Something went wrong"));
  }
};

// Get single room type
export const getSingleRoomType = async (req, res, next) => {
  try {
    const { id } = req.params;

    const roomType = await RoomType.findById(id);
    if (!roomType) {
      return res.status(404).json({ error: "Room type not found." });
    }

    res.status(200).json(roomType);
  } catch (error) {
    next(createError(500, "Something went wrong"));
  }
};

// Update a room type
export const updateRoomType = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, status } = req.body;

    // Validation: Ensure name and status are provided
    if (!name || !status) {
      return res.status(400).json({ error: "Name and status are required." });
    }

    const updatedRoomType = await RoomType.findByIdAndUpdate(
      id,
      {
        name,
        description,
        status,
      },
      { new: true }
    );

    if (!updatedRoomType) {
      return res.status(404).json({ error: "Room type not found." });
    }

  //  return  res.status(200).json(updatedRoomType);
  return  res.status(200).json({message:"Room Type Succesfully Updated"});

  } catch (error) {
    next(createError(500, "Something went wrong"));
  }
};

// Delete a room type
export const deleteRoomType = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedRoomType = await RoomType.findByIdAndDelete(id);

    if (!deletedRoomType) {
      return res.status(404).json({ error: "Room type not found." });
    }

    res.status(200).json({ message: "Room type deleted successfully." });
  } catch (error) {
    next(createError(500, "Something went wrong"));
  }
};

//  ----------------------------ROOM CATEGORY SECTION ----------------------------------------- 
// Create Room Category
export const createRoomCategory = async (req, res, next) => {
  try {
    const { name, description, status } = req.body;

    // Validation: Ensure name and status are provided
    if (!name || !status) {
      return res.status(400).json({ error: "Name and status are required." });
    }

    const newRoomType = new roomCategoryModel({
      ID:generateRandomID('RC'),
      name,
      description,
      status,
    });

    const savedRoomType = await newRoomType.save();

    if (savedRoomType) {
      return res.status(201).json({ message: "Room CAtegory Created Succesfully." });
    }

    // res.status(201).json(savedRoomType);
  } catch (error) {
    console.log("ikibazooo:: ", error);
    next(createError(500, "Something went wrong"));
  }
};

// Get all room category
export const getAllRoomCategory = async (req, res, next) => {
  try {
    const roomCategory = await roomCategoryModel.find();
    res.status(200).json(roomCategory);
  } catch (error) {
    next(createError(500, "Something went wrong"));
  }
};

// Get single room category
export const getSingleRoomCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const roomCAtegory = await roomCategoryModel.findById(id);
    if (!roomCAtegory) {
      return res.status(404).json({ error: "Room Category not found." });
    }

    res.status(200).json(roomCAtegory);
  } catch (error) {
    next(createError(500, "Something went wrong"));
  }
};

// Update a room category
export const updateRoomCAtegory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, status } = req.body;

    // Validation: Ensure name and status are provided
    if (!name || !status) {
      return res.status(400).json({ error: "Name and status are required." });
    }

    const updatedRoomCAtegory = await roomCategoryModel.findByIdAndUpdate(
      id,
      {
        name,
        description,
        status,
      },
      { new: true }
    );

    if (!updatedRoomCAtegory) {
      return res.status(404).json({ error: "Room Category not found." });
    }

  //  return  res.status(200).json(updatedRoomType);
  return  res.status(200).json({message:"Room Category Succesfully Updated"});

  } catch (error) {
    next(createError(500, "Something went wrong"));
  }
};

// Delete a room category
export const deleteRoomCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedRoomCategory = await roomCategoryModel.findByIdAndDelete(id);

    if (!deletedRoomCategory) {
      return res.status(404).json({ error: "Room Category not found." });
    }

    res.status(200).json({ message: "Room Category deleted successfully." });
  } catch (error) {
    next(createError(500, "Something went wrong"));
  }
};




// -------------------------- BED TYPE ----------------------



// Create Bed Type
export const createBedType = async (req, res, next) => {
  try {
    const { name, status } = req.body;

    // Validation: Ensure name and status are provided
    if (!name || !status) {
      return res.status(400).json({ error: "Name and status are required." });
    }

    const newBedType = new BedType({
      name,
      status,
    });

    const savedBedType = await newBedType.save();

    res.status(201).json(savedBedType);
  } catch (error) {
    next(createError(500, "Something went wrong"));
  }
};

// Get all bed types
export const getAllBedTypes = async (req, res, next) => {
  try {
    const bedTypes = await BedType.find();
    res.status(200).json(bedTypes);
  } catch (error) {
    next(createError(500, "Something went wrong"));
  }
};

// Get single bed type
export const getSingleBedType = async (req, res, next) => {
  try {
    const { id } = req.params;

    const bedType = await BedType.findById(id);
    if (!bedType) {
      return res.status(404).json({ error: "Bed type not found." });
    }

    res.status(200).json(bedType);
  } catch (error) {
    next(createError(500, "Something went wrong"));
  }
};

// Update a bed type
export const updateBedType = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, status } = req.body;

 

    const updatedBedType = await BedType.findByIdAndUpdate(
      id,
      {
        name,
        status,
      },
      { new: true }
    );

    if (!updatedBedType) {
      return res.status(404).json({ error: "Bed type not found." });
    }

    res.status(200).json({message:" Bed Type Updated Succesfully"});
  } catch (error) {
    next(createError(500, "Something went wrong"));
  }
};

// Delete a bed type
export const deleteBedType = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedBedType = await BedType.findByIdAndDelete(id);

    if (!deletedBedType) {
      return res.status(404).json({ error: "Bed type not found." });
    }

    res.status(200).json({ message: "Bed type deleted successfully." });
  } catch (error) {
    next(createError(500, "Something went wrong"));
  }
};





// ----------------------- AMENITIES --------------------------------


// Create Amenity
export const ____createAmenity = async (req, res, next) => {
  try {
    const { name, description, icon, status } = req.body;

    // Validation: Ensure name and status are provided
    if (!name || !status) {
      return res.status(400).json({ error: "Name and status are required." });
    }

    const newAmenity = new Amenities({
      name,
      description,
      icon,
      status,
    });

    const savedAmenity = await newAmenity.save();

    res.status(201).json(savedAmenity);
  } catch (error) {
    next(createError(500, "Something went wrong"));
  }
};

 
// Controller to store amenities data
export const x_createAmenity = async (req, res, next) => {
  try {
    const { commonAmenities, additionalAmenities, specialFeatures, homeSafety } = req.body;

    // Create the new amenities object following the Mongoose schema structure
    const newAmenitiesData = {
      commonAmenities: commonAmenities.map((amenity) => ({
        amenities: amenity.amenities.map(({ name, icon }) => ({ name, icon })),
      })),
      additionalAmenities: additionalAmenities.map((amenity) => ({
        amenities: amenity.amenities.map(({ name, icon }) => ({ name, icon })),
      })),
      specialFeatures: specialFeatures.map((amenity) => ({
        amenities: amenity.amenities.map(({ name, icon }) => ({ name, icon })),
      })),
      homeSafety: homeSafety.map((amenity) => ({
        amenities: amenity.amenities.map(({ name, icon }) => ({ name, icon })),
      })),
    };

    // Save the new amenities data to the Amenities collection
    await Amenities.findOneAndUpdate({}, newAmenitiesData, { new: true, upsert: true });

    res.status(201).json({ message: "Amenities data stored successfully." });
  } catch (error) {
    next(createError(500, "Something went wrong"));
  }
};

export const createAmenity = async (req,res,next)=>{
  const {cateId,description,name,icon,status} = req.body;
  try {

    // check if category is Exist 
    const isAmenityCategoryExist = await AmenitiesCategory.findOne({_id:cateId});
    if(!isAmenityCategoryExist){
      return res.status(400).json({message:" Amenity Category NotFound!"})
    }
    // check if amenity is exist 
    const isAmenityExist = await Amenities.findOne({name:name});
    if(isAmenityExist){
      return res.status(400).json({message:" this Amenity is already registed!"})
    }

    const ID = generateRandomID('A');
    const createdNewAmenity = new Amenities({
      catId:cateId,
      name,
      description,
      icon,
      status,
      ID:ID
    });
 console.log("ID ID:: ",ID);
    const saveAmenity  = await createdNewAmenity.save();
    if(!saveAmenity) return next(createError(404,"Amenity failed to be saved! please try again later!"));
console.log("here is ok")
      // Push the new Amenity's ID to the amenities array in the associated Amenity Category
      isAmenityCategoryExist.amenities.push(saveAmenity._id);
      await isAmenityCategoryExist.save();
      console.log("here is ok or not")
    return res.status(201).json({message:"New Amenity Created Succefully! "});
  } catch (error) {
    console.log("the error is:: ", error);
    return next(createError(500,"Samething Goes Wrong on the server"));
  }
}

// Get all amenities
export const getAllAmenities = async (req, res, next) => {
  try {
    const amenities = await Amenities.find().populate('catId');
    res.status(200).json(amenities);
  } catch (error) {
    next(createError(500, "Something went wrong"));
  }
};

// Get single amenity
export const getSingleAmenity = async (req, res, next) => {
  try {
    const { id } = req.params;

    const amenity = await Amenities.findById(id);
    if (!amenity) {
      return res.status(404).json({ error: "Amenity not found." });
    }

    res.status(200).json(amenity);
  } catch (error) {
    next(createError(500, "Something went wrong"));
  }
};

// Update an amenity
export const ___updateAmenity = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, category, icon, status,description } = req.body;

    const updatedAmenity = await Amenities.findByIdAndUpdate(
      id,
      {
        name,
        category,
        icon,
        status,
        description,
      },
      { new: true }
    );

    if (!updatedAmenity) {
      return res.status(404).json({ error: "Amenity not found." });
    }

    res.status(200).json(updatedAmenity);
  } catch (error) {
    console.log(error);
    next(createError(500, "Something went wrong"));
  }
};


 
export const updateAmenity = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, category, icon, status, description } = req.body;
 
    const updatedAmenity = await Amenities.findByIdAndUpdate(
      id,
      {
        name,
        category,
        icon,
        status,
        description,
      },
      { new: true }
    );

    if (!updatedAmenity) {
      return res.status(404).json({ error: "Amenity not found." });
    }
 

        // If the category is changed, update the Amenity's category in AmenitiesCategory
        if (updatedAmenity.category !== category) {
 
          await amenitiesCategoryModel.updateMany(
            { amenities: id },
            { $pull: { amenities: id } }
          );
    
          // Add the Amenity to the new category
          await AmenitiesCategory.findByIdAndUpdate(
            category,
            { $addToSet: { amenities: id } }
          );
        }



   return res.status(200).json({message:"Amenity Succesfully Updated"});
  } catch (error) {
    console.log(error);
    next(createError(500, "Something went wrong"));
  }
};

// Delete an amenity
export const __deleteAmenity = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedAmenity = await Amenities.findByIdAndDelete(id);

    if (!deletedAmenity) {
      return res.status(404).json({ error: "Amenity not found." });
    }

    res.status(200).json({ message: "Amenity deleted successfully." });
  } catch (error) {
    next(createError(500, "Something went wrong"));
  }
};


export const deleteAmenity = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedAmenity = await Amenities.findByIdAndDelete(id);

    if (!deletedAmenity) {
      return res.status(404).json({ error: "Amenity not found." });
    }

    // Remove the deleted amenity from the AmenitiesCategory
    await amenitiesCategoryModel.updateMany(
      { amenities: id },
      { $pull: { amenities: id } }
    );

    res.status(200).json({ message: "Amenity deleted successfully." });
  } catch (error) {
    next(createError(500, "Something went wrong"));
  }
};



// ----------------------- DEPARTMENT CATEGORY--------------------------------


 
// Controller function to create a new AmenityCategory
export const createAmenityCategory = async (req, res) => {
  try {
    const newAmenityCategory = await AmenitiesCategory.create({...req.body,ID:generateRandomID('a')});
    return res.status(201).json(newAmenityCategory);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

 

 
// Controller function to get all AmenityCategories
export const getAllAmenityCategories = async (req, res) => {
  try {
    const allAmenityCategories = await AmenitiesCategory.find().populate('amenities');
    return res.status(200).json(allAmenityCategories);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

 
 
// Controller function to get a specific AmenityCategory by ID
export const getAmenityCategoryById = async (req, res) => {
  try {
    const amenityCategory = await AmenitiesCategory.findById(req.params.id);
    if (!amenityCategory) {
      return res.status(404).json({ message: 'AmenityCategory not found' });
    }
    return res.status(200).json(amenityCategory);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


// Controller function to update an existing AmenityCategory by ID
export const updateAmenityCategory = async (req, res) => {
  try {
    const updatedAmenityCategory = await AmenitiesCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAmenityCategory) {
      return res.status(404).json({ message: 'AmenityCategory not found' });
    }
    return res.status(200).json(updatedAmenityCategory);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


 
// Controller function to delete an AmenityCategory by ID
export const __deleteAmenityCategory = async (req, res) => {
  try {
    const deletedAmenityCategory = await AmenitiesCategory.findByIdAndDelete(
      req.params.id
    );
    if (!deletedAmenityCategory) {
      return res.status(404).json({ message: 'AmenityCategory not found' });
    }
    return res.status(200).json({ message: 'AmenityCategory deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

 
export const deleteAmenityCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAmenityCategory = await AmenitiesCategory.findByIdAndDelete(id);
    if (!deletedAmenityCategory) {
      return res.status(404).json({ message: 'AmenityCategory not found' });
    }

    // Delete all amenities related to the deleted AmenityCategory
    await Amenities.deleteMany({ catId: id });

    return res.status(200).json({ message: 'AmenityCategory deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};




// ----------------------- DEPARTMENT --------------------------------

  
// Controller to create a department
export const createDepartment = async (req, res, next) => {
  try {
    const { name, Icon, description } = req.body;

    // Check if a department with the same name already exists
    const existingDepartmentByName = await Department.findOne({ name });
    if (existingDepartmentByName) {
      return res.status(400).json({ message: 'Department name already exists' });
    }

    // Check if a department with the same ID already exists
    const existingDepartmentByID = await Department.findOne({ ID: generateRandomID('D') });
    if (existingDepartmentByID) {
      return res.status(400).json({ message: 'Department ID already exists' });
    }

    // Create a new department if both name and ID are unique
    const newDepartment = new Department({
      name,
      Icon,
      ID: generateRandomID('D'), // Generating ID using the provided function
      description,
    });
    const savedDepartment = await newDepartment.save();
    res.status(201).json(savedDepartment);
  } catch (error) {
    next(error);
  }
};

// Controller to get all departments
export const getAllDepartments = async (req, res, next) => {
  try {
    const departments = await Department.find().populate('positions');
    res.status(200).json(departments);
  } catch (error) {
    next(error);
  }
};
 
// Controller to get department by ID
export const getDepartmentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const department = await Department.findById(id);
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }
    res.status(200).json(department);
  } catch (error) {
    next(error);
  }
};
 
// Controller to update department by ID
export const updateDepartment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedDepartment = await Department.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedDepartment) {
      return res.status(404).json({ message: 'Department not found' });
    }
    res.status(200).json(updatedDepartment);
  } catch (error) {
    next(error);
  }
};

// Controller to delete department by ID
 
// Controller to delete a department and its associated positions
export const deleteDepartment = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Find the department to be deleted
    const deletedDepartment = await Department.findById(id);
    if (!deletedDepartment) {
      return res.status(404).json({ message: 'Department not found' });
    }

    // Find positions associated with the department and delete them
    const deletedPositions = await Position.deleteMany({ depId: id });

    // Delete the department
    await Department.findByIdAndDelete(id);

    res.status(200).json({ message: 'Department and associated positions deleted successfully' });
  } catch (error) {
    next(error);
  }
};

 
export const getPositionsByDepartmentId = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Find positions associated with the provided departmentId
    const positions = await Position.find({ depId: id });

    res.status(200).json(positions);
  } catch (error) {
    next(error);
  }
};


 
 
// ----------------------- POSITIONS --------------------------------
 
// Controller to create a position and assign it to a department
export const createPosition = async (req, res, next) => {
  try {
    const { depId, name, Icon } = req.body;

    // Check if the department ID exists
    const department = await Department.findById(depId);
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }

    const newPosition = new Position({
      depId,
      name,
      Icon,
      ID: generateRandomID('P'), // Generating ID using the provided function
    });
    const savedPosition = await newPosition.save();

    // Push the new position's ID to the positions array in the associated department
    department.positions.push(savedPosition._id);
    await department.save();

    res.status(201).json(savedPosition);
  } catch (error) {
    next(error);
  }
};
 
 
// Controller to fetch all positions
export const getAllPositions = async (req, res, next) => {
  try {
    const positions = await Position.find();
    res.status(200).json(positions);
  } catch (error) {
    next(error);
  }
};

 
 
// Controller to fetch a single position by ID
export const getPositionById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const position = await Position.findById(id);
    if (!position) {
      return res.status(404).json({ message: 'Position not found' });
    }
    res.status(200).json(position);
  } catch (error) {
    next(error);
  }
};

 
 
// Controller to update a position by ID
export const updatePosition = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedPosition = await Position.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedPosition) {
      return res.status(404).json({ message: 'Position not found' });
    }
    res.status(200).json(updatedPosition);
  } catch (error) {
    next(error);
  }
};

 
 
// Controller to delete a position by ID
export const deletePosition = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Find the position to be deleted
    const position = await Position.findById(id);
    if (!position) {
      return res.status(404).json({ message: 'Position not found' });
    }

    // Remove the position from the associated department's positions array
    const department = await Department.findOneAndUpdate(
      { positions: id },
      { $pull: { positions: id } },
      { new: true }
    );

    // Delete the position
    await Position.findByIdAndDelete(id);

    res.status(200).json({ message: 'Position deleted successfully' });
  } catch (error) {
    next(error);
  }
};

 
// ----------------------- ROLES --------------------------------
 
//  create role 
 
export const createRole = async (req, res) => {
  try {
    const { name, description, status } = req.body;

    // Check if role already exists
    const isExist = await Roles.findOne({ name });
    if (isExist) {
      return res.status(400).json({ message: 'Role is already registered' });
    }

    const newRole = await Roles.create({ name, description, status, ID: generateRandomID('R'), });
    res.status(201).json(newRole);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

 
  
//  get all roles 
export const getAllRoles = async (req, res) => {
  try {
    const roles = await Roles.find();
    res.status(200).json(roles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 

//  get single role 
export const getRoleById = async (req, res) => {
  try {
    const roleId = req.params.id;
    const role = await Roles.findById(roleId);
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }
    res.status(200).json(role);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

  

//  update single role 
export const updateRoleById = async (req, res) => {
  try {
    const roleId = req.params.id;
    const { name, description, status } = req.body;
    const updatedRole = await Roles.findByIdAndUpdate(roleId, { name, description, status }, { new: true });
    if (!updatedRole) {
      return res.status(404).json({ message: 'Role not found' });
    }
    res.status(200).json(updatedRole);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

  
// delete roles 
export const deleteRoleById = async (req, res) => {
  try {
    const roleId = req.params.id;
    const deletedRole = await Roles.findByIdAndDelete(roleId);
    if (!deletedRole) {
      return res.status(404).json({ message: 'Role not found' });
    }
    res.status(200).json({ message: 'Role deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

 




// ----------------------- PERMISSION --------------------------------
 
export const createPermission = async (req, res, next) => {
  const {  roleName, description, permissions } = req.body;

  try {

       // check if roles is already exist or not 
       const isExist = await Permission.findOne({ name:roleName });
       if (isExist) {
         return res.status(400).json({ message: 'Permission is already Created' });
       }

      //  console.log("this::", formData);
    const newPermission = new Permission({
      name:roleName,
      description:description,
      permissions,
    });

 
    console.log("all datas:: ",newPermission);

    const savedPermission = await newPermission.save();

    // return res.status(201).json(savedPermission);
    if(savedPermission){

      return res.status(201).json({ message: 'Permission Created Succesfully' });
    }
  } catch (error) {
    next(createError(500, "Something went wrong"));
  }
};



export const getAllPermissions = async (req, res, next) => {
    try {
   
      const permissions = await Permission.find().populate('RoleId');
  
      res.status(200).json(permissions);
    } catch (error) {
      console.error("Error fetching permissions:", error);
      next(createError(500, "Something went wrong"));
    }
  };

 
 
export const editPermission = async (req, res, next) => {
  const permissionId = req.params.id;

  const { formData, permissions } = req.body;

  try {
    const updatedPermission = await Permission.findByIdAndUpdate(
      permissionId,
      {
        formData,
        permissions,
      },
      { new: true }
    );

    if (!updatedPermission) {
      return res.status(404).json({ error: "Permission not found" });
    }

    return res.status(200).json(updatedPermission);
  } catch (error) {
    next(createError(500, "Something went wrong"));
  }
};


// delete permission 
export const deletePermissionById = async (req, res) => {
  try {
    const pId = req.params.id;
    const deletedRole = await Permission.findByIdAndDelete(pId);
    if (!deletedRole) {
      return res.status(404).json({ message: 'Permission is not found' });
    }
    res.status(200).json({ message: 'Permission deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


