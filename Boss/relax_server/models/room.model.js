import mongoose from 'mongoose';

const bedSchema = new mongoose.Schema({
  type: String,
  quantity: Number,
});

const lengthOfStayDiscountSchema = new mongoose.Schema({
  nights: String,
  percentage: String,
});

const earlyBirdDiscountSchema = new mongoose.Schema({
  days: String,
  percentage: String,
});

const lastMinDiscountSchema = new mongoose.Schema({
  days: String,
  percentage: String,
});

const availableRulesSchema = new mongoose.Schema({
  minimumStay: String,
  maximumStay: String,
  selectDates: Date,
});

const basicInfoSchema = new mongoose.Schema({
  bedrooms: String,
  bed: [bedSchema],
  bathrooms: Number,
  privateBathroom: Boolean,
  RoomCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RoomCategory',
  },
  propertyName: String ,
  roomType: String,
  accommodates: String,
  listingName: String,
});

const checkinProcedureSchema = new mongoose.Schema({
  checkin: String,
  checkout: String,
  space: String,
  guestAccess: String,
  interactionWithGuests: String,
  notes: String,
  houseRules: String,
  overview: String,
  gettingArround: String,
  summary: String,
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

 

const pricingInfoSchema = new mongoose.Schema({
  availableMinDate:String,
  availableMaxDate:String,
  numberOfDays:String,
  nightPrice: String,
  currencyCode: String,
  cleaningFee: String,
  additionalGuestFee: String,
  guests: String,
  securityDeposit: String,
  weekendPrice: String,
});

const pricingRulesInfoSchema = new mongoose.Schema({
  lengthOfStayDiscounts: [lengthOfStayDiscountSchema],
  earlyBirdDiscounts: [earlyBirdDiscountSchema],
  lastMinDiscounts: [lastMinDiscountSchema],
});

const bookingInfoSchema = new mongoose.Schema({
  bookingType: String,
});

const termsInfoSchema = new mongoose.Schema({
  cancellationPolicy: String,
});


const roomSchema = new mongoose.Schema(
  {
    ID:{
      type:String,
      required:true,
      unique: true, 
    },
    status:{
      type:String,
      enum:['pending','aproved','rejected'],
      default:'pending',
    },
    published:{
      type:Boolean,
      default:false,
    },
    
    featured:{
      type:Boolean,
      default:false,
    },
    basicInfo: basicInfoSchema,
    checkInProcedure: checkinProcedureSchema,
    locationInfo: locationInfoSchema,
    amenitiesInfo: amenitiesInfoSchema,
    mediaData: mediaDataSchema,
    pricingInfo: pricingInfoSchema,
    pricingRulesInfo: pricingRulesInfoSchema,
    availableRules: [availableRulesSchema],
    bookingInfo: bookingInfoSchema,
    termsInfo: termsInfoSchema,
    book: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
    }],
    
    agentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Room', roomSchema);
