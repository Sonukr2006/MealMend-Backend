import mongoose from "mongoose";
import { DB_name } from "../constants.js";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(
      `${process.env.MONGO_URI}/${DB_name}`
    );
    console.log(`\n MongoDB Connected: ${connection.connection.host}`);
  } catch (err) {
    console.log("Error connecting to MongoDB: ", err);
  }
};

export default connectDB;
