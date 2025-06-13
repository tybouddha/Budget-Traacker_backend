/// <reference types="node" />
import mongoose from "mongoose";
const connectionString = process.env.MONGO_URI || "";
mongoose.set("strictQuery", true);

mongoose
  .connect(connectionString, { connectTimeoutMS: 2000 } as any)
  .then(() => console.log("Successfully connected to the Tablée Database 🥳 !"))
  .catch((errorMessage) => console.error(errorMessage));
