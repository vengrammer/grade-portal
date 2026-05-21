import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDb = async () => { 
    const MONGO_URI = process.env.MONGO_URI;
    if(!MONGO_URI) {
        throw new Error("MONGO_URI is not defined");
    }

    try {
        await mongoose.connect(MONGO_URI);
        console.log("DB Connected");
    } catch (error) {
        console.log(error);
    }
};

export default connectDb;