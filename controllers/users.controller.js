import UserSchema from '../models/user.model.js';

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
    const user = await UserSchema.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found.' });
    }
    res.status(200).json({ success: true, message: 'User profile updated successfully.', user });
}

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
    getUserProfile,
    updateUserProfile,
    changePassword,
    deleteUser
};

