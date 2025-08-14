import { Router } from 'express';
import { registerUser, loginUser, getUserProfile, updateUserProfile, changePassword, deleteUser } from '../controllers/user.controller';

// creating a new router instance that will handle user-related routes
const userRouter = Router();

// Importing necessary functions from the user controller and defining routes
userRouter.post('/', registerUser); // Route to register a new user
userRouter.post('/login', loginUser); // Route to log in a user
userRouter.get('/:id', getUserProfile); // Route to get a user's profile by ID
userRouter.patch('/:id', updateUserProfile); // Route to update a user's profile by ID
userRouter.patch('/:id/change-password', changePassword); // Route to change a user's password by ID
userRouter.delete('/:id', deleteUser); // Route to delete a user by ID

// Exporting the userRouter to be used in the main application
export default userRouter;