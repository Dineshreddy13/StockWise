import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";
import { json } from "express";

export const SignUp = async(req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const {username, email, password} = req.body
        const existingUser = await User.findOne({email});
        if(existingUser) {
            const error = new Error("User already exists");
            error.statusCode = 409;
            throw error;
        }

        if(!password || password.length < 6) {
            const error = new Error("Password must be 6 characters long.");
            error.statusCode = 400;
            throw error;
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUsers = await User.create([{
            username,
            email,
            password: hashedPassword,

        }],{session})
        
        const token = jwt.sign({ userId: newUsers[0]._id},JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});

        await session.commitTransaction();
        res.status(201).json({
            success: true,
            message: "User Created Scuccessfully",
            data : {
                token, 
                user: newUsers[0],
            },
        })

    }catch(error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}
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
            const error = new Error("invalid password");
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
export const SignOut = async(req, res, next) => {

}