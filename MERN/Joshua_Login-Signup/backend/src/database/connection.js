import mongoose from "mongoose";

export const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to Mongo DB Atlas successfully");
  } catch (error) {
    console.log(error);
  }
};
