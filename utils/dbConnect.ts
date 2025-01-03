import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "";

const dbConnect = async () => {
    if (mongoose.connection.readyState >= 1) {
        return;
    }
    await mongoose.connect("mongodb+srv://temothy101629:4st5Yw4uH05FqQIy@cluster0.92w5o.mongodb.net/");
};

export default dbConnect;
