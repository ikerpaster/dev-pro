import mongoose from "mongoose";

const { Schema } = mongoose;

const DepartmentSchema = new Schema(
  {
    ID:{
      type:String,
      required:true,
      unique: true, 
    },
    Icon:{
      type:String,
    },
    name: {
      type: String,
      required: true,
      unique: true, 
    },
    description:String,

    staff: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }],

    positions: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Position"
    }],

  },
  {
    timestamps: true, 
  }
);

export default mongoose.model("Department", DepartmentSchema);

