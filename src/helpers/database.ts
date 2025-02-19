import mongoose, { Connection, Mongoose } from "mongoose";
import { AvailableCompaniesNames } from "../configs/companies";

class DatabaseManager {
  private static uri = "mongodb://admin:admin@localhost:27017";

  private connection: Connection | null = null;

  public get connectionInstance(): Connection | null {
    return this.connection;
  }

  private async getConnection(): Promise<Connection> {
    if (!this.connection) {
      try {
        const mongooseInstance: Mongoose = await mongoose.connect(
          DatabaseManager.uri,
          { dbName: "nfes" }
        );
        this.connection = mongooseInstance.connection;
        console.log("Database connected successfully");
      } catch (error) {
        console.error("Database connection error:", error);
        throw error;
      }
    }
    return this.connection;
  }

  public async connect(): Promise<void> {
    await this.getConnection();
  }

  public async save(collectionName: string, document: any): Promise<any> {
    const connection = await this.getConnection();
    const collection = connection.collection(collectionName);
    const result = await collection.insertOne(document);
    return result;
  }

  public async findLast(
    collectionName: string,
    companyName: AvailableCompaniesNames
  ): Promise<any> {
    const connection = await this.getConnection();
    const collection = connection.collection(collectionName);
    const result = await collection.findOne(
      { companyName },
      { sort: { createdAt: -1 } }
    );

    return result || "000000000000000";
  }
}

export default DatabaseManager;
