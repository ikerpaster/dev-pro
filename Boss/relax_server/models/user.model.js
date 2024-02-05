import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    nickName: String,
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
   
    isCardSaved:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "CreditCard",
    },

    phone: String,
    mobile: String,
    profile: Object,
 
    country:String,
    state:String,
    city: String,
    address1: String,
    address2: String,
    zipCode: String,

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },

    role: {
      type: String,
      enum: ['isAdmin', 'isClient', 'isAgent'],
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    documentIDs: [Object],
    documentIDsE: [Object],
    department: String,
    position: String,
    workMobile: String,
    telephone: String,
    branch: String,
    workLocation: String,
    joiningDate: String,
    contract: String,
    employeeType: String,
    workPermitNo: String,
    workPermitExpiry: String,
    visaNo: String,
    visaExpiry: String,
    emiratesIdNo: String,
    passportNo:String,
    passportExpiry: String,
    // lineManager: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    // },
    nationality: String,
    gender: {
      type: String,
      enum: ['male', 'female','none','non-binary','transgender','genderfluid'],
      default:'none',
    },

    language: [String],
    maritalStatus: String,
    dateOfBirth: String,
    placeOfBirth: String,
    numOfChildren: String,
    homeAddress: String,
    academicLevel: String,
    fieldOfStudy: String,
    school: String,
    privateMobile: String,
    privateEmail: String,
    emergencyContactName: String,
    emergencyContactNumber: String,
    notes: String,
    countryBank:String,


  password: String,
  socialMedia: {
    google: {
      id: String,
      token: String,
      email: String,
      name: String,
      profilePic:String
    },
    facebook: {
      id: String,
      token: String,
      email: String,
      name: String
    },
    github: {
      id: String,
      token: String,
      email: String,
      name: String
    }
  },
  authMethod: {
    type: String,
    enum: ['traditional', 'google', 'facebook', 'github'],
    default: 'traditional'
  },
  rooms: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room"
  }],
  hotels: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel"
  }],
  book: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking"
  }],
  conversation: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Conversation"
  }],

  isActive:{
    type:Boolean,
    default:false,
    required:true
  },
  isVerified:{
  type:Boolean,
  default:false,
  required:true
},

ID:{
  type:String,
  required:true
},

creditCard:[{
  type: mongoose.Schema.Types.ObjectId,
  ref: "CreditCard"
}],
bankInfo:[{
  type: mongoose.Schema.Types.ObjectId,
  ref: "Billing"
}],

  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
