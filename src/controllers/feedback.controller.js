import { Feedback } from "../models/feedback.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/Apiresponse.js";
import asyncHandller from "../utils/asyncHandller.js";

const FeedbackWithAdmin = asyncHandller(async (req, res) => {
  const { userId, phone, fullName, feedback } = req.body;

  if ([fullName, phone, feedback].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const feedbackWithAdmin = await Feedback.create({
    userId,
    fullName,
    phone,
    feedback,
  });

  const feedbacks = await Feedback.find().select("-password -refreshToken");

  if (!feedbacks) {
    throw new ApiError(500, "Something went wrong while sending feedback");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Thank You For Feedback"));
});

export { FeedbackWithAdmin };
