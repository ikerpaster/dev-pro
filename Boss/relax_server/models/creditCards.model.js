import mongoose from "mongoose";

const { Schema } = mongoose;

const CreditCardSchema = new Schema(
  {
    
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    cardNumber: {
      type: String,
      required: true,
    },
    
    cardHolderName: {
      type: String,
      required: true,
    },
    // Expiration month (1-12)
    expirationMonth: {
      type: Number,
      required: true,
      validate: {
        validator: (value) => value >= 1 && value <= 12,
        message: "Expiration month must be between 1 and 12",
      },
    },
    // Expiration year (current year or later)
    expirationYear: {
      type: Number,
      required: true,
      validate: {
        validator: (value) => value >= new Date().getFullYear(),
        message: "Expiration year must not be in the past",
      },
    },
 
    cvv: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ['deleted', 'blocked', 'active'],
      default: 'active',
    },
    
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("CreditCard", CreditCardSchema);
