import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    // required: true
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    // required: true
  },
  guest:{
    type:String,
    // required:true,
  },
  startDate: {
    type: Date,
    // required: true
  },
  endDate: {
    type: Date,
    // required: true
  },
  totalAmount: {
    type: Number,
    // required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ["pending","pendding", "canceled","rejected", "completed"],
    default: "pending"
}

},
{
  timestamps: true,
});

bookingSchema.statics.isRoomAvailable = async function (roomId, startDate, endDate) {
  const bookings = await this.find({
    roomId: roomId,
    startDate: { $lte: endDate },
    endDate: { $gte: startDate }
  });

  return bookings.length === 0;
};

 
 
// bookingSchema.statics.isAllRoomAvailable = async function (startDate, endDate) {
//   const roomsAvailable = await this.find({
//     startDate: { $lte: endDate },
//     endDate: { $gte: startDate }
//   });

//   return roomsAvailable.length === 0;
// };


 
export default mongoose.model("Booking", bookingSchema);
