import exp from "express";
import { authenticate } from "../Services/authService.js";
import { UserTypeModel } from "../models/UserModel.js";
import { ArticleModel } from "../models/ArticleModel.js";
import bcrypt from "bcryptjs";
import { verifyToken } from "../middlewares/verifyToken.js";
export const commonRouter = exp.Router();

//login
commonRouter.post("/login", async (req, res) => {
  //get user cred object
  let userCred = req.body;
  //call authenticate service
  let { token, user } = await authenticate(userCred);
  //save tokan as httpOnly cookie
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "none",
    secure: true, // Required for sameSite: "none"
  });
  //send res
  res.status(200).json({ message: "login success", payload: user });
});

// Check if user is authenticated (restores session on refresh)
commonRouter.get("/check-auth", verifyToken("USER", "AUTHOR", "ADMIN"), async (req, res) => {
  try {
    const user = await UserTypeModel.findById(req.user.userId || req.user._id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Authenticated", payload: user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get all active articles (Public route for homepage)
commonRouter.get("/articles", async (req, res, next) => {
  try {
    let articles = await ArticleModel.find({ isArticleActive: true })
      .populate("author", "firstName email")
      .populate("comments.user");
    res.status(200).json({ message: "Articles", payload: articles });
  } catch (err) {
    next(err);
  }
});

// Get single article by ID
commonRouter.get("/articles/:articleId", async (req, res, next) => {
  try {
    let article = await ArticleModel.findOne({ _id: req.params.articleId, isArticleActive: true })
      .populate("author", "firstName email bio")
      .populate("comments.user", "firstName email profileImageUrl");
    if (!article) return res.status(404).json({ message: "Article not found" });
    res.status(200).json({ message: "Article found", payload: article });
  } catch (err) {
    next(err);
  }
});

//logout for User, Author and Admin
commonRouter.get("/logout", (req, res) => {
  // Clear the cookie named 'token'
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.status(200).json({ message: "Logged out successfully" });
});

//Change password(Protected route)
commonRouter.put("/change-password", async (req, res) => {
  //get current password and new password
  const { role, email, currentPassword, newPassword } = req.body;
  // Prevent same password
  if (currentPassword === newPassword) {
    return res.status(400).json({ message: "newPassword must be different from currentPassword" });
  }

  // Find user by email (works for USER, AUTHOR, ADMIN — all same collection)
  const account = await UserTypeModel.findOne({ email });
  if (!account) {
    return res.status(404).json({ message: "Account not found" });
  }

  // Verify current password
  const isMatch = await bcrypt.compare(currentPassword, account.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Current password is incorrect" });
  }
  // Hash and save new password
  account.password = await bcrypt.hash(newPassword, 10);
  await account.save();

  res.status(200).json({ message: "Password changed successfully" });
});