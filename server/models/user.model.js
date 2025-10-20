import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: [true, "User Name is required"],
        trim: true,
        match: [/^[\w.]+$/, "Name can contain only letters, numbers, underscores, and dots"],
        minLength: [3, "name must be atleast 3 character long"],
        maxLength: [50, "name must be less than or equal to 50 characters."],
    },

    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "please fill a valid email address"],
    },

    password: {
        type: String,
        required: [true, "User Password is required."],
        minLength: 6,
    }
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;