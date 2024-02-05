import mongoose from "mongoose";

const { Schema } = mongoose;

// Subschema for the location information
const LocationSchema = new Schema({
  city: {
    type: String,
    // required: true,
  },
  // country: {
  //   type: String,
  //   required: true,
  // },
  addressLine1: {
    type: String,
    // required: true,
  },
  addressLine2: String,
  cityTownDistrict: String,
  stateProvinceCountyRegion: String,
  zipPostalCode: String,
  mapAddress: {
    place: String,
    mapUrl: String,
  },
});

// Subschema for the property information
const PropertyInfoSchema = new Schema({
  proName: {
    type: String,
    required: true,
  },
  proType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PropertyType",
  },
  proCategory:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "PropertyCategory",
  },
  Prodescription: {
    type: String,
    required: true,
  },
  proBuildingNumbers: String,
  proFloorNumbers: String,
  proImages: [
    {
      type: String,
      required: true,
    },
  ],
  status: {
    type: Boolean,
    default: true,
  },
});

const PropertiesSchema = new Schema(
  {
    ID:{
      type:String,
      required:true,
      unique:true,
    },
    
    agentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    agentId: {
      type: String,
    },

    rooms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
      },
    ],
    cheapestRoom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    locationInfo: LocationSchema, // Using the LocationSchema as a subdocument
    proInfo: PropertyInfoSchema, // Using the PropertyInfoSchema as a subdocument
  },
  { timestamps: true }
);

export default mongoose.model("Property", PropertiesSchema);
