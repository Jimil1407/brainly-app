import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

import users from '../schema/userSchema';
import links from '../schema/linkschema';
import contents from '../schema/contentSchema';
import tags from '../schema/tagschema';

let isConnected = false;

const connectDB = async () => {
    // If already connected, return true
    if (isConnected) {
        return true;
    }

    try {
        const dbUrl = process.env.DB_URL;
        if (!dbUrl) {
            console.error("❌ DB_URL environment variable is not set!");
            process.exit(1);
        }
        
        // Add connection options to handle timeouts
        await mongoose.connect(dbUrl, {
            serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
            socketTimeoutMS: 45000, // Close sockets after 45 seconds
            bufferCommands: false, // Disable mongoose buffering
        });
        
        isConnected = true;
        console.log('✅ Connected to MongoDB Atlas');
        return true;
    } catch (error) {
        console.error('❌ Error connecting to MongoDB:', error);
        return false;
    }
}

export { connectDB, users, links, contents, tags };
export default connectDB;