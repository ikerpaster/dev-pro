import mongoose from "mongoose";

const { Schema } = mongoose;

const AmenitySchema = new Schema(
  {
    ID:{
      type:String,
      required:true,
      unique:true,
    },
    catId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "AmenitiesCategory",
      required:true,
    },
    name: {
      type: String,
      required: true,
      unique: true, 
    },
    icon: {
      type: String,
    },
    description:String,
    status: {
      type: Boolean,
      default: true,
    }
  },
  {
    timestamps: true, 
  }
);

export default mongoose.model("Amenities", AmenitySchema);

