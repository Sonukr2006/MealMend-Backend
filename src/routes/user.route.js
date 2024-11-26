import { Router } from "express";
import {
  registorUser,
  loginUser,
  logoutUser,
} from "../controllers/user.controller.js";
import { ContactWithAdmin } from "../controllers/contact.controller.js";
import { FeedbackWithAdmin } from "../controllers/feedback.controller.js";
import { RequestItem } from "../controllers/request.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyjwt } from "../middlewares/auth.middlewares.js";
import { Token } from "../controllers/token.controller.js";
import { User } from "../models/user.model.js";

const router = Router();
router.route("/register").post(
  upload.fields([
    {
      // images bhejne ke liye
      name: "avatar",
      maxCount: 1,
    },
  ]),
  registorUser
);
router.route("/login").post(loginUser, (req, res) => {
  const { email, password, phone } = req.body;
  const user = User.find(
    (u) => u.email === email || (u.phone === phone && u.password === password)
  );
  if (user) {
    res.status(200).json({
      message: "Login successful !",
      description: "Welcome back to Mealmend.",
    });
  } else {
    res.status(401).json({
      message: "Login failed",
      description: "Invalid email or password.",
    });
  }
});
router.get("/profile", verifyjwt, (req, res) => {
  res.json({ message: "You are authenticated", user: req.user });
});
router.route("/request").post(RequestItem, (req, res) => {
  const {userId,role, itemType, itemName, quantity, quality, address, itemDescription, phone, pickupDate } = req.body;
  res.status(200).json({ statusCode: 200, message: "Request submitted successfully" });
});

router.route("/feedback").post(FeedbackWithAdmin);
router.route("/contact").post(ContactWithAdmin);
router.route("/logout").post(verifyjwt, logoutUser);
export default router;
