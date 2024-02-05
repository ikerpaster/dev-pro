
import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import {
    blockUser,
    createAmenity,
    createAmenityCategory,
    createBedType,
    createBooking,
    createDepartment,
    createHotelListing,
    createPermission,
    createPosition,
    createPropertyCategory,
    createPropertyType,
    createRentalsListing,
    createRole,
    createRoomCategory,
    createRoomListing,
    createRoomType,
    deleteAmenity,
    deleteAmenityCategory,
    deleteBedType,
    deleteBooking,
    deleteDepartment,
    deleteHotel,
    deletePermissionById,
    deletePosition,
    deleteProCategory,
    deleteProType,
    deleteRentals,
    deleteRoleById,
    deleteRoom,
    deleteRoomCategory,
    deleteRoomType,
    deleteUser,
    editHotel,
    editPermission,
    editUser,
    getAllAmenities,
    getAllAmenityCategories,
    getAllBedTypes,
    getAllBookings,
    getAllConversation,
    getAllDeletedUser,
    getAllDepartments,
    getAllPermissions,
    getAllPositions,
    getAllProCategory,
    getAllProCategoryList,
    getAllProType,
    getAllRentalsListing,
    getAllRoles,
    getAllRoomCategory,
    getAllRoomListing,
    getAllRoomTypes,
    getAllUser,
    getAmenityCategoryById,
    getDepartmentById,
    getHotelsByAgent,
    getLineManagers,
    getPositionById,
    getPositionsByDepartmentId,
    getRoleById,
    getSIngleUser,
    getSingleAmenity,
    getSingleBedType,
    getSingleBooking,
    getSingleProCategory,
    getSingleProType,
    getSingleRentas,
    getSingleRoom,
    getSingleRoomCategory,
    getSingleRoomType,
    updateAmenity,
    updateAmenityCategory,
    updateBedType,
    updateBooking,
    updateDepartment,
    updatePosition,
    updateProCategory,
    updateProType,
    updateRoleById,
    updateRoom,
    updateRoomCAtegory,
    updateRoomType
} from "../controllers/admin.controller.js";
import { isAdmin } from "../middleware/authAccess.js";
import { getListingsHotels, getSingleHotel } from "../controllers/hotel.controller.js";
import { register } from "../controllers/auth.controller.js";
const router = express.Router();


// ---------------USERS--------------
//  create a new user 
router.post("/users/register", register);
// get all users 
router.get("/users", getAllUser);
// edit user by id 
router.get('/users/single/:id', getSIngleUser);
// delete user by id
router.delete('/users/delete/:id', deleteUser);

// get all deleted users 
router.get("/users/deleted", getAllDeletedUser);

// edit user 
router.patch('/users/edit/:id', verifyToken, isAdmin, editUser);

// block the user 

router.put('/users/block/user/:id', verifyToken, isAdmin, blockUser);

router.get('/users/linemanagers',getLineManagers);


// -----------------HOTELS -------------------
// create a new hotel 
router.post('/properties/new',  createHotelListing);
// get all hotels 
router.get('/properties/all', getListingsHotels);
// get hotels by id 
router.get('/properties/single/:id',  getSingleHotel);
// get hotels belongs to the specifiq Agent
router.get('/properties/belongs/agent/:id', getHotelsByAgent);
// edit hotels
router.put('/properties/edit/:id', editHotel);
// delete hotel 
router.delete('/properties/delete/:id', deleteHotel);


// -------------ROOMS --------------------------
// create a room 
router.post('/rooms/new', createRoomListing);
// get all rooms 
router.get('/rooms/all', getAllRoomListing);
// delete room
router.delete('/rooms/delete/:id', deleteRoom);
// get single room 
router.get('/rooms/single/:id', getSingleRoom);
// edit room 
router.patch('/rooms/edit/:id', updateRoom);



// -------------RENTALS --------------------------
// create a property 
router.post('/rentals/new', createRentalsListing);
// get all properties 
router.get('/rentals/all', getAllRentalsListing);
// delete room
router.delete('/rentals/delete/:id', deleteRentals);
// get single room 
router.get('/rentals/single/:id', getSingleRentas);
// edit room 
router.patch('/rooms/edit/:id', updateRoom);




//------------------------ BOOKINGS -------------------
// create bookings 
router.post('/bookings/new/:id', verifyToken, isAdmin, createBooking);
// get all booking 
router.get('/bookings/all/', verifyToken, isAdmin, getAllBookings);
// get single booking 
router.get('/bookings/single/:id', verifyToken, isAdmin, getSingleBooking);
// edit booking 
router.patch('/bookings/edit/:id', verifyToken, isAdmin, updateBooking);
// delete booking 
router.delete('/bookings/delete/:id', verifyToken, isAdmin, deleteBooking);

// get all conversation 
router.get('/conversations/all', verifyToken, isAdmin, getAllConversation);


//---------------------- PROPERTY TYPE --------------------
router.post('/propert-type', createPropertyType);
router.get('/propert-type/all', getAllProType);
router.get('/property-type/single/:id',getSingleProType);
router.put('/property-type/:id',updateProType);
router.delete('/property-type/:id',deleteProType);


//---------------------- PROPERTY CATEGORY --------------------
router.post('/propert-category', createPropertyCategory);
router.get('/propert-category/all/:id', getAllProCategoryList);
router.get('/propert-category/all', getAllProCategory);
router.get('/property-category/single/:id', getSingleProCategory);
router.put('/property-category/:id', updateProCategory);
router.delete('/property-category/:id', deleteProCategory);



//---------------------- ROOM TYPE --------------------
router.post('/room-type',  createRoomType);
router.get('/room-type/all', getAllRoomTypes);
router.get('/room-type/single/:id',getSingleRoomType);
router.put('/room-type/:id',updateRoomType);
router.delete('/room-type/:id',deleteRoomType);

 
//---------------------- ROOM CATEGORY --------------------
router.post('/room-category',  createRoomCategory);
router.get('/room-category/all', getAllRoomCategory);
router.get('/room-category/single/:id',getSingleRoomCategory);
router.put('/room-category/:id',updateRoomCAtegory);
router.delete('/room-category/:id',deleteRoomCategory);



//---------------------- BED TYPE --------------------
router.post('/bed-type', createBedType);
router.get('/bed-type/all', getAllBedTypes);
router.get('/bed-type/single/:id',getSingleBedType);
router.put('/bed-type/:id',updateBedType);
router.delete('/bed-type/:id',deleteBedType);

//---------------------- AMENITIES --------------------
router.post('/amenities', createAmenity);
router.get('/amenities/all', getAllAmenities);
router.get('/amenities/single/:id',getSingleAmenity);
router.put('/amenities/:id',updateAmenity);
router.delete('/amenities/:id',deleteAmenity);


//---------------------- AMENITIES TYPE--------------------
router.post('/amenities-category', createAmenityCategory);
router.get('/amenities-category/all', getAllAmenityCategories);
router.get('/amenities-category/single/:id', getAmenityCategoryById);
router.put('/amenities-category/:id', updateAmenityCategory);
router.delete('/amenities-category/:id', deleteAmenityCategory);



//---------------------- DEPARTMENT --------------------
router.post('/department', createDepartment);
router.get('/department/all', getAllDepartments);
router.get('/department/single/:id',getDepartmentById);
router.put('/department/:id',updateDepartment);
router.delete('/department/:id',deleteDepartment);
router.get('/department/all/position/in/this/department/:id' ,getPositionsByDepartmentId);

//---------------------- POSITIONS --------------------
router.post('/position', createPosition);
router.get('/position/all', getAllPositions);
router.get('/position/single/:id',getPositionById);
router.put('/position/:id',updatePosition);
router.delete('/position/:id',deletePosition);


//---------------------- ROLES --------------------
router.post('/roles', createRole);
router.get('/roles/all', getAllRoles);
router.get('/roles/single/:id',getRoleById);
router.put('/roles/:id',updateRoleById);
router.delete('/roles/:id',deleteRoleById);


//---------------------- PERMISSIONS --------------------
router.post('/permissions', createPermission);
router.get('/permissions/all', getAllPermissions);
router.get('/permissions/single/:id',editPermission);
// router.put('/roles/:id',updateRoleById);
router.delete('/permissions/:id',deletePermissionById);


export default router;