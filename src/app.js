import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(cors());
app.use(express.urlencoded());
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "../Frontend/")));
app.use(cookieParser());

//Serves the home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/public/index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname, "../Frontend/Login/login.html");
});
app.get("/register", (req, res) => {
  res.sendFile(__dirname, "../Frontend/Register/register.html");
});
app.get("/contact", (req, res) => {
  res.sendFile(__dirname, "../Frontend/public/index.html");
});
app.get("/request", (req, res) => {
  res.sendFile(__dirname, "../Frontend/Donor/Donor.html");
});
app.get("/request", (req,res)=>{
  res.sendFile(__dirname ,"../Donor/Donor.html" )
})

//routes import
import userRouter from "./routes/user.route.js";

//routes declaration
app.use("/api/users", userRouter);

export { app };
