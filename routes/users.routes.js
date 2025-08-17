import { Router } from 'express';
import { registerUser, loginUser, getUserProfile, getAllUsers, updateUserProfile, changePassword, deleteUser } from '../controllers/users.controller.js';

// creating a new router instance that will handle user-related routes
const userRouter = Router();


/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management endpoints
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *               - first_name
 *               - last_name
 *               - address
 *               - phone_number
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               address:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [admin, user]
 *             example:
 *               username: victoria123
 *               email: victoria@example.com
 *               password: mypassword
 *               first_name: Victoria
 *               last_name: Kabahita
 *               address: Kampala
 *               phone_number: 123456789
 *               role: user
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid input
 */
userRouter.post('/', registerUser); // Route to register a new user


/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               username: victoria123
 *               password: mypassword
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid username or password
 */
userRouter.post('/login', loginUser); // Route to log in a user


/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 *       500:
 *         description: Server error
 */
userRouter.get('/', getAllUsers); // Route to get all users


/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a user's profile by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User profile retrieved
 *       404:
 *         description: User not found
 */
userRouter.get('/:id', getUserProfile); // Route to get a user's profile by ID


/**
 * @swagger
 * /api/users/{id}:
 *   patch:
 *     summary: Update a user's profile by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               address:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               first_name: Victoria
 *               last_name: Kabahita
 *               email: victoria@example.com
 *               address: Kampala
 *               phone_number: 123456789
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *       400:
 *         description: Invalid ID or missing body
 *       404:
 *         description: User not found
 */
userRouter.patch('/:id', updateUserProfile); // Route to update a user's profile by ID


/**
 * @swagger
 * /api/users/{id}/change-password:
 *   patch:
 *     summary: Change a user's password
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - oldPassword
 *               - newPassword
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *             example:
 *               oldPassword: oldpass123
 *               newPassword: newpass123
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       401:
 *         description: Invalid old password
 */
userRouter.patch('/:id/change-password', changePassword); // Route to change a user's password by ID

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
userRouter.delete('/:id', deleteUser); // Route to delete a user by ID

// Exporting the userRouter to be used in the main application
export default userRouter;