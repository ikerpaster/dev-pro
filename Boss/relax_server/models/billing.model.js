import mongoose from "mongoose";
const { Schema } = mongoose;

const BillingSchema = new Schema(
  {
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
      },
    accountName: {
        type: String,
        required: true,
      },
      accountNumber: {
        type: String,
        required: true,
      },
      bankName: {
        type: String,
        required: true,
      },
      swiftNumber: {
        type: String,
        required: true,
      },
      ibanNumber: {
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

export default mongoose.model("Billing", BillingSchema);


