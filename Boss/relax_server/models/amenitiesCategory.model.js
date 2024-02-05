import mongoose from "mongoose";

const { Schema } = mongoose;

const AmenityCategorySchema = new Schema(
  {
    ID:{
      type:String,
      required:true,
      unique: true, 
    },
    name: {
      type: String,
      required: true,
      unique: true, 
    },
    icon: {
      type: String,
    },
    status: {
      type: Boolean,
      required: true,
      default: true,
    },
    description:String,
    amenities: [{
      type: Schema.Types.ObjectId,
      ref: "Amenities"
    }],
  },
  {
    timestamps: true, 
  }
);

export default mongoose.model("AmenitiesCategory", AmenityCategorySchema);

