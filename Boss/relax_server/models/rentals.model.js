import mongoose from 'mongoose';

  
const basicInfoSchema = new mongoose.Schema({
  listingName: String,
  buildingNo: Number,
  propertyFloorNo: Number,
  unitNo:Number,
  description:String,
  bedrooms:Number,
  permitNo: Number,
  bathrooms: Number,
  roomType: String,
  ownshipStatus: String,
  listingOwner: String,
  completionStatus: String,
  price: Number,
  squareFit: Number,
  ocupationStatus: String,
 });

 
 const locationInfoSchema = new mongoose.Schema({
  address: String,
  city: String,
  country: String,
  addressLine1: String,
  addressLine2: String,
  cityTownDistrict: String,
  stateProvinceCountyRegion: String,
  zipPostalCode: String,
  mapAddress:{
    place: String,
    mapUrl:String
  }
});

const RentalSchema = new mongoose.Schema({
  rentalFrequency: String,
  contractPeriod: String,
  vocatingNoticePeriod: String,
  maintenanceFee: Number,
  paidBy: String,
});

const SaleInfoSchema = new mongoose.Schema({
  financingAvailable: String,
  financingInstitutionName: String,
});


const amenitiesInfoSchema = new mongoose.Schema({
  amenities: {
    type: Map,
    of: [String],
  },
});

const mediaDataSchema = new mongoose.Schema({
  VIDEO_DOC: [{}],
  PHOTO_DOC: [{}],
  videoUrl: [String],
});


const rentalsSchema = new mongoose.Schema(
  {
    ID:{
      type:String,
      required:true,
      unique: true, 
    },
    ProPurpose:String,
    ProFurninshing:String,
    // ProType:{
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'PropertyType',
    // },
    // ProCategory:{
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'PropertyCategory',
    // },
    ProType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PropertyType',
    },
    ProCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PropertyCategory',
    },

    basicInfo: basicInfoSchema,
    rentInfo:RentalSchema,
    saleInfo:SaleInfoSchema,
    locationInfo: locationInfoSchema,
    amenitiesInfo: amenitiesInfoSchema,
    mediaData: mediaDataSchema,
    agentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Rentals', rentalsSchema);
