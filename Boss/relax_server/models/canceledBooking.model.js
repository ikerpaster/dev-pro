import mongoose from "mongoose";

const canceledbookingSchema = new mongoose.Schema({

    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        required: true
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    agentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    comment: {
        type: String,
        required: true
    },

},
    {
        timestamps: true,
    });





export default mongoose.model("CanceledBooking", canceledbookingSchema);
