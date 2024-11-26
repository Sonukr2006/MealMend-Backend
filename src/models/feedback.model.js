import mongoose, { Schema } from "mongoose";
import { User } from "./user.model.js";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const feedbackSchema = new mongoose.Schema(
  {
    userId: {
      type:String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    feedback: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
feedbackSchema.plugin(mongooseAggregatePaginate);
export const Feedback = mongoose.model("Feedback", feedbackSchema);
