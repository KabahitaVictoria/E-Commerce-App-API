// mongoose helps connect to MongoDB and manage the database connection
import mongoose from 'mongoose';

// function to connect to MongoDB
const connectDB = async () => {
    try {
        // Ensure the MONGO_URI environment variable is set
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        // Log the error message if connection fails
        console.error('MongoDB connection failed:', error.message);
        process.exit(1); // Exit the process with failure
    }
}

export default connectDB;