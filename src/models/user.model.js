import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowerCase: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
    },
    avatar: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true, //  createdAt and updatedAt fields
  }
);


// Hashing the password before saving it to the database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Comparing the password with the hashed password
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};
userSchema.methods.generateAccessToken = function () {
  if (!this._id) {
    throw new Error("Invalid user ID for access token generation");
  }

  try {
    return jwt.sign(
      { userid: this._id , role: this.role}, // Access token using user login through their role
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "15m" } // Use fallback expiry if not set
    );
  } catch (error) {
    console.error("Error generating access token:", error);
    throw new Error("Failed to generate access token");
  }
};

userSchema.methods.generateRefreshToken = function () {
  if (!this._id) {
    throw new Error("Invalid user ID for refresh token generation");
  }

  try {
    return jwt.sign(
      { userid: this._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "7d" } // Use fallback expiry if not set
    );
  } catch (error) {
    console.error("Error generating refresh token:", error);
    throw new Error("Failed to generate refresh token");
  }
};

const User = mongoose.model("User", userSchema);

export { User };
