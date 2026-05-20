import User from "../Model/userModel.js";
import { Session } from "../Model/sessionModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const register = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      companyName,
      isAgency,
      phone,
    } = req.body;

    if (
      !fullName ||
      !email ||
      !password ||
      !companyName ||
      isAgency === undefined ||
      !phone
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
  fullName,
  email: normalizedEmail,
  password: hashedPassword,
  companyName,
  isAgency,
  phone,
  isVerified: true,
});

    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
      },
    });

  } catch (error) {
    console.error("REGISTER ERROR =>", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    // Generic error for security
    if (!existingUser) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate tokens
    const accessToken = jwt.sign(
      { id: existingUser._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "2d" }
    );

    const refreshToken = jwt.sign(
      { id: existingUser._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    // Remove previous sessions
    await Session.deleteMany({
      userId: existingUser._id,
    });

    // Create new session
    await Session.create({
      userId: existingUser._id,
      refreshToken,
    });

    return res.status(200).json({
      success: true,
      message: `Welcome back, ${existingUser.fullName}!`,
      accessToken,
      refreshToken,
      user: {
        _id: existingUser._id,
        fullName: existingUser.fullName,
        email: existingUser.email,
        companyName: existingUser.companyName,
        isAgency: existingUser.isAgency,
      },
    });

  } catch (error) {
    console.error("LOGIN ERROR =>", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
