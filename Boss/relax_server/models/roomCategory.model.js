import mongoose from "mongoose";

const { Schema } = mongoose;

const RoomCategorySchema = new Schema(
  {
    ID:{
      type:String,
      required:true,
      unique:true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("RoomCategory", RoomCategorySchema);