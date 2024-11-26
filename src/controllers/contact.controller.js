import { Contact } from "../models/contact.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/Apiresponse.js";
import asyncHandller from "../utils/asyncHandller.js";

const ContactWithAdmin = asyncHandller(async (req, res) => {
  const { email, fullName, message } = req.body;

  if ([fullName, email, message].some(field => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const contactWithAdmin = await Contact.create({
    fullName,
    email,
    message,
  });

  const contacts = await Contact.find().select("-password -refreshToken");

  if (!contacts) {
    throw new ApiError(500, "Something went wrong while connecting with me");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Thank You For Connecting With Me"));
});

export { ContactWithAdmin };
