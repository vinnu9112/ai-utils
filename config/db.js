import mongoose from 'mongoose';
import colors from 'colors';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`connected to mongoose ${mongoose.connection.host}`.bgGreen.white);
  } catch (error) {
    console.log("Some error with mongoose");
  }
};

export default connectDB;
