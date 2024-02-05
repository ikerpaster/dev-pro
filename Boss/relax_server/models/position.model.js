import mongoose from "mongoose";

const { Schema } = mongoose;

const PositionSchema = new Schema(
  {
    depId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department"
    },
  
    ID:{
      type:String,
      required:true
    },
    Icon:{
      type:String,
    },
    name: {
      type: String,
      required: true,
      unique: true, 
    },

    staff: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }],

  },
  {
    timestamps: true, 
  }
);

export default mongoose.model("Position", PositionSchema);

