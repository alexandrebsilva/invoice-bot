import mongoose from "mongoose";
import { AvailableCompaniesNames } from "../configs/companies";

class DatabaseManager {
  private static uri = "mongodb://admin:admin@localhost:27017";

  private static async establishConnection(): Promise<void> {
    try {
      await mongoose.connect(DatabaseManager.uri, { dbName: "nfes" });
    } catch (error) {
      console.error("Failed to connect to the database", error);
      throw error;
    }
  }

  public static async saveDocument(
    collectionName: string,
    document: object
  ): Promise<void> {
    try {
      if (mongoose.connection.readyState !== 1) {
        await DatabaseManager.establishConnection();
      }
      const collection = mongoose.connection.collection(collectionName);
      await collection.insertOne(document);
      console.log(`Document inserted into collection: ${collectionName}`);
    } catch (error) {
      console.error("Failed to insert document", error);
      throw error;
    }
  }

  public static async getLastInteractionNsu(
    companyName: AvailableCompaniesNames
  ): Promise<string> {
    try {
      if (mongoose.connection.readyState !== 1) {
        await DatabaseManager.establishConnection();
      }
      const collection = mongoose.connection.collection("interactions");
      const lastDocument = await collection.findOne(
        { companyName },
        { sort: { createdAt: -1 } }
      );

      return lastDocument?.ultNSU || "000000000000000";
    } catch (error) {
      console.error("Failed to get the last interaction", error);
      throw error;
    }
  }
}

export default DatabaseManager;
