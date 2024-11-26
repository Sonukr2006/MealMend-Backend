import asyncHandller from "../utils/asyncHandller.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import ApiResponse from "../utils/Apiresponse.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);

    if(!user){
      throw new ApiError(400, "User not found")
    }
    const accessToken =user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token"
    );
  }
};

const registorUser = asyncHandller(async (req, res) => {
  //get user details from frontend
  //validation - not emtpy
  //check if user already exists
  //check for images .check for avtar
  //upload them to cloudinary , avatar
  //create user object - create entry in db
  //remove password  and refresh token field from response
  //check for user creation
  //return response
  const { email, password, fullName, avatar, role, phone } = req.body;
  if (
    [fullName, email, password, role, phone].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ fullName }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, "User with email or fullName already exists");
  }
  const avatarLocalPath = req.files?.avatar?.[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const avtar = await uploadOnCloudinary(avatarLocalPath);
  if (!avtar) {
    throw new ApiError(400, "Avatar is required");
  }
  const user = await User.create({
    fullName,
    avatar: avtar.url,
    email,
    password,
    role,
    phone,
  });

  const CreatedUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!CreatedUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, CreatedUser, "User registerd successfully"));
});

const loginUser = asyncHandller(async (req, res) => {
  const { email, phone, password } = req.body;

  if (!phone && !email) {
    throw new ApiError(400, "phone or email is required");
  }
  // if(!(phone || email)){
  // throw new ApiError(400, "phone or email is required")
  //}

  const user = await User.findOne({
    $or: [{ phone }, { email }],
  });
  if (!user) {
    throw new ApiError(404, "User does not exist");
  }
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken" 
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

 
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged In Successfully"
      )
    );
});

const logoutUser = asyncHandller(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1, // this removes the field from document
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
});


export { registorUser, loginUser, logoutUser,generateAccessAndRefereshTokens };
