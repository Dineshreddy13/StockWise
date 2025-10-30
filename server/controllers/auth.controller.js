import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN, EMAIL_USER, EMAIL_PASS } from "../config/env.js";
import { json } from "express";
import Watchlist from "../models/watchlist.model.js";
import crypto from "crypto";
import nodemailer from "nodemailer";

export const SignUp = async (req, res, next) => {
  try {
    const {
      username,
      email,
      password,
      country,
      investmentGoals,
      riskTolerance,
      preferredIndustry,
    } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error("User already exists");
      error.statusCode = 409;
      throw error;
    }

    if (!password || password.length < 6) {
      const error = new Error("Password must be at least 6 characters long.");
      error.statusCode = 400;
      throw error;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      country,
      investmentGoals,
      riskTolerance,
      preferredIndustry,
    });

    const token = jwt.sign(
      { userId: newUser._id },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.status(201).json({
      success: true,
      message: "User Created Successfully",
      data: { token, user: newUser },
    });
  } catch (error) {
    next(error);
  }
};

export const SignIn = async(req, res, next) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if(!isValidPassword) {
            const error = new Error("incorrect password");
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign({userId: user._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});

        res.status(200).json({
            success: true,
            message: "User signed in successfully",
            data : {
                token,
                user,
            }
        });
    }catch(error) {
        next(error);
    }

}

export const SignOut = async (req, res, next) => {
  try {
    const userId = req.user.id; 

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await Watchlist.findOneAndDelete({ user: userId });

    await User.findByIdAndDelete(userId);

    return res.status(200).json({
      success: true,
      message: "User and associated watchlist deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};


export const ForgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("User not found with this email");
      error.statusCode = 404;
      throw error;
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpHash = crypto.createHash("sha256").update(otp).digest("hex");

    user.otp = otpHash;
    user.otpExpire = Date.now() + 5 * 60 * 1000; 
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Your OTP for Password Reset",
      html: `<h3>Hello ${user.username}</h3>
             <p>Your OTP for password reset is <b>${otp}</b>.</p>
             <p>This OTP will expire in 5 minutes.</p>`,
    });

    res.status(200).json({
      success: true,
      message: "OTP sent to your registered email",
    });
  } catch (error) {
    next(error);
  }
};


export const VerifyOTP = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    const otpHash = crypto.createHash("sha256").update(otp).digest("hex");

    if (
      !user.otp ||
      user.otp !== otpHash ||
      user.otpExpire < Date.now()
    ) {
      const error = new Error("Invalid or expired OTP");
      error.statusCode = 400;
      throw error;
    }

    user.otp = undefined;
    user.otpExpire = undefined;
    await user.save();

    const resetToken = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "10m", 
    });

    res.status(200).json({
      success: true,
      message: "OTP verified successfully",
      data: { resetToken },
    });
  } catch (error) {
    next(error);
  }
};


export const ResetPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      const error = new Error("Unauthorized or missing token");
      error.statusCode = 401;
      throw error;
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    next(error);
  }
};
