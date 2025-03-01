import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number;
};

var connection: ConnectionObject = { isConnected: 0 };

/**
 * Establishes a connection to the MongoDB database using Mongoose.
 * 
 * If a connection is already established (`connection.isConnected == 1`), 
 * it logs a message and returns immediately.
 * 
 * Otherwise, it attempts to connect to the database using the URI specified 
 * in the `MONGODB_URI` environment variable. Upon successful connection, 
 * it updates the `connection.isConnected` state and logs a success message.
 * 
 * If the connection attempt fails, it logs an error message and throws the error.
 * 
 * @returns {Promise<void>} A promise that resolves when the connection is established.
 * @throws Will throw an error if the database connection fails.
 */
async function dbConnect(): Promise<void> {
    if (connection.isConnected == 1) {
        console.log("Already connected to the database");
        return
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI!);
        connection.isConnected = db.connections[0].readyState;

        console.log("DB connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error);
        throw error;
    }
}

export default dbConnect;