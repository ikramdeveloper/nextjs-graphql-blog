import mongoose from "mongoose";

let connection: any = {};
const connectDB = async () => {
  if (connection.isConnected) {
    console.log("db is already connected");
    return;
  }

  if (mongoose.connections.length) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log("use previous connection");
      return;
    }
    await mongoose.disconnect();
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("connected to db successfully");
    connection.isConnected = db.connections[0].readyState;
  } catch (err: any) {
    console.error(`Error connecting to db: ${err.message}`);
  }
};

export default connectDB;
