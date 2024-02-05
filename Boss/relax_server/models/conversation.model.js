import mongoose from "mongoose";
const { Schema } = mongoose;

const ConversationSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    agentId: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    clientId: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    readByAgent: {
      type: Boolean,
      required: true,
    },
    readByClient: {
      type: Boolean,
      required: true,
    },
    lastMessage: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Conversation", ConversationSchema);
