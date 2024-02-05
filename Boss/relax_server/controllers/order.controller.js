import Order from "../models/order.model.js";
import Stripe from "stripe";
import createError from "../utils/createError.js";
import Booking from "../models/booking.model.js";


export const createOrder = async (req, res, next) => {

  try {
    const stripe = new Stripe(process.env.STRIPE);

    // const room = await Book.findById(req.params.id);
    const book = await Booking.findById(req.params.id);
    if (!book) return next(createError(404, "Your Booking NotFound"));
  
    const paymentIntent = await stripe.paymentIntents.create({
      amount: book.totalAmount * 100,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });
  
    // check if bookId is exist 
    const isOrderExist = await Order.findOne({bookId:req.params.id});
    if(isOrderExist) return next(createError,"the order is already exist!");
    console.log("okokokkk ");
  
    const newOrder = new Order({
      bookId: book._id,
      clientId: req.userId,
      payment_intent: paymentIntent.id,
    });
  
    await newOrder.save();
    // res.status(200).json(newOrder);
  
    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    // return next(createError,(500,"samething goes wrong!!!"));
    console.log("err msg::",error);
    res.json(error);
  }

};
 

export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({
      clientId: req.userId
    });
    res.status(200).send(orders);
  } catch (err) {
    next(createError(404, "error in making orders"));
  }
};

export const confirm = async (req, res, next) => {
  try {
    const orders = await Order.findOneAndUpdate(
      {
        payment_intent: req.body.payment_intent,
      },
      {
        $set: {
          isCompleted: true,
        },
      }
    );

    console.log("the order related to intentity: ", orders);

    // try to update the booking status 
    const book = await Booking.findOneAndUpdate(
      {
        _id: orders.bookId,
      },
      {
        $set: {
          status: 'completed',
        },
      }
    );

    if (!book) return next(createError(404, "Error in payment process!!!"));

    res.status(200).send("Order has been confirmed.");
  } catch (err) {
    next(err);
  }
};
