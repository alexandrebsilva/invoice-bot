import mongoose, { Connection, Mongoose } from "mongoose";
import { AvailableCompaniesNames } from "../configs/companies";

class DatabaseManager {
  private static uri =
    "mongodb+srv://invoice-bot:BWLVZK4jY6LPRknb@cluster0.k0iwq.mongodb.net/";
  // BWLVZK4jY6LPRknb

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
      { companyName, success: true },
      { sort: { createdAt: -1 } }
    );

    return result?.ultNSU;
  }

  public async updateMany(): Promise<any> {
    const connection = await this.getConnection();
    const collection = connection.collection("nfe_summary");
    const result = await collection.updateMany({}, [
      {
        $set: {
          "json.resNFe.vNF": { $toDouble: "$json.resNFe.vNF" },
          "json.resNFe.dhEmi": {
            $dateFromString: {
              dateString: "$json.resNFe.dhEmi",
              onError: "Invalid Date",
              onNull: null,
            },
          },
        },
      },
    ]);
    return result;
  }
}
const databaseManager = new DatabaseManager();
databaseManager.updateMany().then(() => {
  console.log("done");
});
export default DatabaseManager;

// [
//   {
//     $set: {
//       "json.resNFe.vNF": { $toDouble: "$json.resNFe.vNF" },
//       "json.resNFe.dhEmi": {
//         $dateFromString: {
//           dateString: "$json.resNFe.dhEmi",
//           onError: "Invalid Date",
//           onNull: null
//         }
//       }
//     }
//   }
// ]
