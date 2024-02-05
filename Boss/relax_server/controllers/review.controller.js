import createError from "../utils/createError.js";
import Review from "../models/review.model.js";
import hotelModel from "../models/hotel.model.js";
import userModel from "../models/user.model.js";


export const createReview = async (req, res, next) => {

  try {

    // check the role of user 
    const user = await userModel.findById(req.userId);


    if (user.role === 'isAgent') return next(createError(403, "Agent can't create a review!"));

    const newReview = new Review({
      userId: req.userId,
      hotelId: req.body.hotelId,
      desc: req.body.desc,
      star: req.body.star,
    });



    const review = await Review.findOne({
      hotelId: req.body.hotelId,
      userId: req.userId,
    });

    if (review)
      return next(
        createError(403, "You have already created a review for this Hotel!")
      );


    const savedReview = await newReview.save();

    const hotel = await hotelModel.findByIdAndUpdate(req.body.hotelId, {
      $inc: { totalStars: req.body.star, starNumber: 1 },
    });

    hotel.reviews.push(savedReview._id);
    await hotel.save();


    res.status(201).send(savedReview);
  } catch (err) {
    next(err);
  }
};

export const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ hotelId: req.params.hotelId });
    res.status(200).send(reviews);
  } catch (err) {
    next(err);
  }
};
export const deleteReview = async (req, res, next) => {
  try {
 
    // 1- check if review is exists
    const review = await Review.findOne({ hotelId: req.params.id, userId: req.userId });
    if (!review) return next(createError(404, "Review NotFound!"));


    // 3- update the review from total hotels 
    // reduse the hotel review fro the tootal number of the reviews 
    const hotel = await hotelModel.findByIdAndUpdate(req.params.id, {
      $inc: { totalStars: -review.star, starNumber: -1 },
    });

    // 2- delete review from review tbl 
    const delReview = await Review.findByIdAndDelete(review._id);
    if (!delReview) return next(createError(404, "samething happens while u deleting this reviews!! "));



    if (!hotel) return next(createError(404, "samething strangers happens while u deleteing this review!!1"));

    res.status(200).json({ message: "your reviews deleted succfully from this hotel!" });
    // const hotel =  await Hotel.find
    // 4- then return same messages


  } catch (err) {
    next(err);
  }
};
