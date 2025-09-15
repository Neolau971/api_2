import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) throw new Error("MONGODB_URI not defined");

let isConnected = false;

export default async function connectDB() {
    if (isConnected) {
        console.log("deja connecté");
        return;
    }

    try {
      await mongoose.connect(MONGODB_URI);
      isConnected = true;
    } catch (error) {
        throw error;
    }
}