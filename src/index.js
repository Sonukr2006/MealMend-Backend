import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});

connectDB();
try {
  app.listen(process.env.PORT, () => {
    console.log(`\nServer is running on port in index.js: ${process.env.PORT}`);
    console.log(`Open http://localhost:${process.env.PORT} in your browser`);
  });
} catch (err) {
  console.log(" Error in index.js starting server: ", err);
}
