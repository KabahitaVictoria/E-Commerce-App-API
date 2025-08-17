import express from 'express';
import dotenv from 'dotenv'; // dotenv loads environment variables from a .env file
import connectDB from './config/db.js'; // Import the database connection function
import orderRouter from './routes/orders.routes.js'; // Import the order routes
import userRouter from './routes/users.routes.js'; // Import the user routes
import productRouter from './routes/products.routes.js'; // Import the product routes
import swaggerDocs from './config/swagger.js';

dotenv.config(); // Load environment variables from .env file
connectDB(); // Connect to MongoDB

const app = express(); // Create an instance of Express application
app.use(express.json()); // Middleware to help the express app handle JSON data in requests

// Define routes
app.use('/api/v1/orders', orderRouter); // Use the order routes
app.use('/api/v1/users', userRouter); // Use the user routes
app.use('/api/v1/products', productRouter); // Use the product routes

// Swagger
swaggerDocs(app);

const port = process.env.PORT || 8000; // Set the port from environment variable or default to 8000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); // Start the server and listen on the specified port

