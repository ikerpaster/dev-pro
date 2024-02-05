import mongoose from "mongoose";

const { Schema } = mongoose;

const FacilitySchema = new Schema({
  name: {
    type: String,
    require: true
  },
  images: {
    type: [String],
    trim: true
  }

}, { timestamps: true });


export default mongoose.model("Category", FacilitySchema);
