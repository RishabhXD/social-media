import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
    });
    console.log(`MongoDB connected with : ${connect.connection.host}`);
  } catch (error) {
    console.log(error.message);
  }
};
