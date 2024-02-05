import mongoose from "mongoose";

const { Schema } = mongoose;

const BedTypeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
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

export default mongoose.model("BedType", BedTypeSchema);