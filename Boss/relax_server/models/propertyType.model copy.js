import mongoose from "mongoose";

const { Schema } = mongoose;

const PropertyTypeSchema = new Schema(
  {
    ID:{
      type:String,
      required:true
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
      default:true
    },
   
    category: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "PropertyCategory"
    }],

  },
  {
    timestamps: true,
  }
);

export default mongoose.model("PropertyType", PropertyTypeSchema);
