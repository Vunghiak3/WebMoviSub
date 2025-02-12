import mongoose from "mongoose";

const connectionToDatabase = async () => {
  const mongoUrl = process.env.MongoURL;

  if (!mongoUrl) {
    console.error(
      "MongoURL is undefined. Please set the environment variable."
    );
    return;
  }

  try {
    await mongoose.connect(mongoUrl);
    console.log("Connected to DB successfully");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

export default connectionToDatabase;
