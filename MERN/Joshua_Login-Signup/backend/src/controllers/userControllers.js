import User from "../models/User.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/tokenManager.js";
import { COOKIE_NAME } from "../utils/constant.js";

// Controller function to register a user
export const registerUser = async (req, res) => {
  try {
    // Get the user information from the request body
    const { username, password, userType } = req.body;
    // Check if a user with the same email already exists
    let user = await User.findOne({ username });
    if (user) {
      return res
        .status(401)
        .send("Sorry a user with the same email already exists");
    }
    // Generate a secured password hash along with salt
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    // If user doesn't exist then create a new one
    user = await User.create({
      username,
      password: hashedPassword,
      userType,
    });
    // Clear cookie if user register again
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      path: "/",
      signed: true,
      secure: true,
      sameSite: "none",
    });
    // Generate a auth token for the user
    const token = generateToken(user._id.toString(), user.username, "7d");
    if (!token) {
      return res.status(400).send("Failed to generate token");
    }
    // Set the token as a cookie with an expiration date of 7 days
    let expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      expires,
      path: "/",
      signed: true,
      secure: true,
      sameSite: "none",
    });
    return res.status(201).json({
      message: "ok",
      username: user.username,
      userType: user.userType,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error", reason: error.message });
  }
};

// Controller function to login a user
export const loginUser = async (req, res) => {
  try {
    // Get the user information from the request body
    const { username, password, userType } = req.body;
    console.log(username, password);
    // Check if a user with the same email already exists
    let user = await User.findOne({ username });
    if (!user) {
      return res.status(401).send("Account not registered");
    }
    // Check if the user entered the correct password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).send("Invalid credentials");
    }
    // Check if the user type matches the one in the database
    if (userType !== user.userType) {
      return res.status(401).send("Incorrect user type");
    }
    // Clear cookie if user logins again
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      path: "/",
      signed: true,
      secure: true,
      sameSite: "none",
    });
    // Generate a auth token for the user
    const token = generateToken(user._id.toString(), user.username, "7d");
    if (!token) {
      return res.status(400).send("Failed to generate token");
    }
    // Set the token as a cookie with an expiration date of 7 days
    let expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      expires,
      path: "/",
      signed: true,
      secure: true,
      sameSite: "none",
    });
    return res.status(200).json({
      message: "ok",
      username: user.username,
      userType: user.userType,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error", reason: error.message });
  }
};

// Controller function to verify a user
export const verifyUser = async (req, res) => {
  try {
    // Get the user id from the res.locals.jwtData
    const userId = res.locals.jwtData.id;
    // Find the user by their id from the database
    const user = await User.findById(userId);
    // Check if the id matches
    if (user._id.toString() !== userId) {
      return res.status(401).send("Permissions didn't match");
    }
    return res.status(200).json({
      message: "ok",
      username: user.username,
      userType: user.userType,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error", reason: error.message });
  }
};

// Controller function to logout a user
export const logoutUser = async (req, res) => {
  try {
    // Get the user id from the res.locals.jwtData
    const userId = res.locals.jwtData.id;
    // Find the user by their id from the database
    const user = await User.findById(userId);
    // Check if the id matches
    if (user._id.toString() !== userId) {
      return res.status(401).send("Permissions didn't match");
    }
    // Clear the cookie of the user
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      signed: true,
      path: "/",
      secure: true,
      sameSite: "none",
    });
    return res.status(200).json({
      message: "ok",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error", reason: error.message });
  }
};
