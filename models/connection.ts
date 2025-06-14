/// <reference types="node" />
import mongoose from "mongoose";

const connectionString =
  process.env.MONGO_URI || "mongodb://localhost:27017/budget-tracker";
console.log("Tentative de connexion à MongoDB");

mongoose.set("strictQuery", true);

mongoose
  .connect(connectionString, {
    connectTimeoutMS: 2000,
    serverSelectionTimeoutMS: 5000, // Augmenté pour donner plus de temps à la connexion
  } as any)
  .then(() => {
    console.log("Successfully connected to the Budget-Tracker Database 🥳 !");
    console.log("MongoDB version:", mongoose.version);
  })
  .catch((errorMessage) => {
    console.error("Erreur de connexion à MongoDB:", errorMessage);
    process.exit(1); // Arrête l'application en cas d'échec de connexion
  });

export default mongoose;
