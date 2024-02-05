import mongoose from "mongoose";

const { Schema } = mongoose;

const PropertyCategorySchema = new Schema(
  {
    ID:{
      type:String,
      required:true
    },
    name: {
      type: String,
      required: true,
    },
    subCatego: String,
    proType: {
      type: mongoose.Schema.Types.ObjectId,
    ref: "PropertyType",
    required:true,
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

export default mongoose.model("PropertyCategory", PropertyCategorySchema);
