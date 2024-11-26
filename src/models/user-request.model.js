import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const userRequestSchema = new mongoose.Schema(
  {
    userId: {
      type:String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    itemType: {
      type: String,
      required: true,
    },
    itemName: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    quality: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    itemDescription: {
      type: String,
      required: true,
    },
  
    phone: {
      type:String,
      required: true,
    },
    pickupDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);
userRequestSchema.plugin(mongooseAggregatePaginate);
export const UserRequest = mongoose.model("UserRequest", userRequestSchema);
