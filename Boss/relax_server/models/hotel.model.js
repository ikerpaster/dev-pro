import mongoose from "mongoose";

const { Schema } = mongoose;

const HotelSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  images: {
    type: [String],
    trim: true
  },
 
    country: {
      type: String,
      require: true,
    },
    address1: {
      type: String,
    },
    address2: {
      type: String,
    },
    state: {
      type: String,
      require: true
    },
    city: {
      type: String,
      require: true
    },
    zipcode:{
      type:String,
      require:true
   
  },
  totalStars: {
    type: Number,
    default: 0,
  },
  starNumber: {
    type: Number,
    default: 0,
  },
  status: {
    type: Boolean,
    default: true
},
  
  agentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true
  },
  rooms: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room"
  }],
  cheapestRoom:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room"
  },
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Review"
  }],

type:{
  type:String,
  required:true
}


}, { timestamps: true });


export default mongoose.model("Hotel", HotelSchema);
