import UserSchema from '../models/user.model.js';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// function for registering a new user
const registerUser = async (req, res) => {
    try {
        const user = await UserSchema.create(req.body);
        res.status(201).json({ success: true, message: `User has been created successfully.` });
    } catch (error) {
        res.status(400).json({ success: false, message: `Error creating user: ${error.message}` });
    }
}

// function for logging in a user
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await UserSchema.findOne({ username });
        
        if(!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ success: false, message: 'Invalid username or password.' });
        }
        res.status(200).json({ success: true, message: 'Login successful.', user });
    } catch (error) {
        res.status(500).json({ success: false, message: `Error logging in: ${error.message}` });
    }
}

// get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await UserSchema.find({});
        res.status(200).json({ success: true, users });
    } catch (error) {
        res.status(500).json({ success: false, message: `Error fetching users: ${error.message}` });
    }
}

// function for viewing a user's profile
const getUserProfile = async (req, res) => {
    try {
        const user = await UserSchema.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }
        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: `Error fetching user profile: ${error.message}` });
    }
}

// function for updating a user's profile
const updateUserProfile = async (req, res) => {
    try {
      const { id } = req.params;
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid user ID." });
      }
  
      const user = await UserSchema.findById(id);
      if (!user) return res.status(404).json({ success: false, message: "User not found." });
  
      // Safety check for req.body
      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ success: false, message: "No data provided to update." });
      }
  
      Object.keys(req.body).forEach((key) => {
        user[key] = req.body[key];
      });
  
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);
      }
  
      await user.save();
  
      res.status(200).json({
        success: true,
        message: "User profile updated successfully.",
        user,
      });
    } catch (err) {
      console.error("Update failed:", err);
      res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
  };
  

// function for changing a user's password
const changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const user = await UserSchema.findById(req.params.id);
    
    if (!user || !(await user.comparePassword(oldPassword))) {
        return res.status(401).json({ success: false, message: 'Invalid old password.' });
    }
    
    user.password = newPassword;
    await user.save();
    res.status(200).json({ success: true, message: 'Password changed successfully.' });
}

// function for deleting a user
const deleteUser = async (req, res) => {
    const user = await UserSchema.findByIdAndDelete(req.params.id);
    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found.' });
    }
    res.status(200).json({ success: true, message: 'User deleted successfully.' });
}

// Exporting all user-related functions for use in routes
export {
    registerUser,
    loginUser,
    getAllUsers,
    getUserProfile,
    updateUserProfile,
    changePassword,
    deleteUser
};

