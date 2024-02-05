import mongoose from "mongoose";

const { Schema } = mongoose;

const RolesSchema = new Schema(
  {
    ID:{
        type:String,
        required:true,
        unique:true,
      },
    name: {
        type: String,
        required: true,
        unique:true
      },
      description: {
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

export default mongoose.model("Roles", RolesSchema);