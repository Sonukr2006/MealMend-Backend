import { UserRequest } from "../models/user-request.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/Apiresponse.js";
import asyncHandller from "../utils/asyncHandller.js";

const RequestItem = asyncHandller(async (req, res) => {
  const {
    userId,
    role,
    itemType,
    itemName,
    quantity,
    quality,
    address,
    itemDescription,
    phone,
    pickupDate,
  } = req.body;

  if (
    [
      userId,
      role,
      itemType,
      itemName,
      quantity,
      quality,
      address,
      itemDescription,
      phone,
      pickupDate,
    ].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const userRequest = await UserRequest.create({
    userId,
    role,
    itemType,
    itemName,
    quantity,
    quality,
    address,
    itemDescription,
    phone,
    pickupDate,
  });

  const userRequests = await UserRequest.find().select(
    "-password -refreshToken"
  );

  if (!userRequests) {
    throw new ApiError(500, "Something went wrong while creating the request");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Thank You For Your Request"));
});

export { RequestItem };
