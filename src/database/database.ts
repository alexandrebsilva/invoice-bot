import mongoose, { Connection, Mongoose } from "mongoose";
import { AvailableCompaniesNames } from "../configs/companies";
import { NfeSummary } from "./models/nfe-summary";
import { NfeComplete } from "./models/nfe-complete";

class DatabaseManager {
  private static uri =
    "mongodb+srv://invoice-bot:BWLVZK4jY6LPRknb@cluster0.k0iwq.mongodb.net/";

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
    const content =
      collectionName === "nfe_summary"
        ? NfeSummary.fromDto(document)
        : collectionName === "nfe_complete"
        ? NfeComplete.fromDto(document)
        : document;
    const collection = connection.collection(collectionName);
    const result = await collection.insertOne({
      ...content,
      createdAt: new Date(),
    });
    return result;
  }

  public async findLast(
    collectionName: string,
    companyName: AvailableCompaniesNames
  ): Promise<any> {
    const connection = await this.getConnection();
    const collection = connection.collection(collectionName);
    const result = await collection.findOne(
      { companyName, success: true },
      { sort: { createdAt: -1 } }
    );
    return result?.ultNSU;
  }

  public async findAll(collectionName: string): Promise<any[]> {
    const connection = await this.getConnection();
    const collection = connection.collection(collectionName);
    const result = await collection.find({}).toArray();
    return result;
  }
}

export default DatabaseManager;
