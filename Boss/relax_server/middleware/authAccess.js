import User from "../models/user.model.js";
import createError from "../utils/createError.js";

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return next(createError(404, "Invalid authentication"));
    }

    if (user.role !== 'isAdmin') {
      return next(createError(403, "Unauthorized Access admin Only"));
    }

    req.isAdmin = user.role; // Attach the user object to the request for later use
    next();
  } catch (error) {
    next(createError(500, "Something went wrong on the server"));
  }
};

export const isAgent = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return next(createError(404, "Invalid authentication"));
    }

    if (user.role !== 'isAgent') {
      return next(createError(403, "Unauthorized Access Agent Only"));
    }

    if (!user.isActive) return next(createError(403, "This accout is bloked!"));

    req.isAgent = user.role; // Attach the user object to the request for later use
    next();
  } catch (error) {
    next(createError(500, "Something went wrong on the server"));
  }
};

export const isClient = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return next(createError(404, "Invalid authentication"));
    }

    if (user.role !== 'isClient') {
      return next(createError(403, "Unauthorized Access Client Only"));
    }
    if (!user.isActive) return next(createError(403, "This accout is bloked!"));

    req.isClient = user.role; // Attach the user object to the request for later use
    next();
  } catch (error) {
    next(createError(500, "Something went wrong on the server"));
  }
};