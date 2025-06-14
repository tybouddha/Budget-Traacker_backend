import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer: MongoMemoryServer;

export const connectTestDB = async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri, {
    connectTimeoutMS: 10000,
    serverSelectionTimeoutMS: 10000,
  });
};

export const disconnectTestDB = async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
};

export const clearTestDB = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
};
