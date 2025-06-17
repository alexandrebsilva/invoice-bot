import mongoose, { Collection, Connection, Mongoose } from "mongoose";
import { NfeEvent } from "../src/database/models/nfe-event";
import { NfeSummary, NfeSummaryDto } from "../src/database/models/nfe-summary";
import { NfeComplete } from "../src/database/models/nfe-complete";
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

  public async normalizeNfeSummaryPayload() {
    const connection = await this.getConnection();
    const collection = connection.collection("nfe_summary");

    // Get all documents
    const documents = (await collection
      .find({})
      .toArray()) as unknown as NfeSummaryDto[];
    console.log(`Found ${documents.length} documents to process`);

    let processed = 0;
    let errors = 0;

    for (const dto of documents) {
      try {
        // Convert to NfeSummary instance
        const nfeSummary = NfeSummary.fromDto(dto);

        // Update the document with normalized data
        await collection.updateOne(
          { _id: dto._id },
          { $set: { json: nfeSummary.json } }
        );

        processed++;
        if (processed % 100 === 0) {
          console.log(`Processed ${processed} documents...`);
        }
      } catch (error) {
        console.error(`Error processing document ${dto._id}:`, error);
        errors++;
      }
    }

    console.log(`\nProcessing complete:`);
    console.log(`- Total documents: ${documents.length}`);
    console.log(`- Successfully processed: ${processed}`);
    console.log(`- Errors: ${errors}`);
  }

  public async findMissingCompleteDocuments() {
    const connection = await this.getConnection();
    const summaryCollection = connection.collection("nfe_summary");
    const completeCollection = connection.collection("nfe_complete");

    // Get all chNFe from nfe_summary
    const summaries = (await summaryCollection
      .find({})
      .toArray()) as unknown as NfeSummaryDto[];
    console.log(`Found ${summaries.length} documents in nfe_summary`);

    // Get all chNFe from nfe_complete
    const completes = (await completeCollection
      .find({})
      .toArray()) as unknown as NfeComplete[];
    console.log(`Found ${completes.length} documents in nfe_complete`);

    // Create sets of chNFe for faster lookup
    const completeChNFes = new Set(
      completes.map((doc) => doc.json.nfeProc.protNFe.infProt.chNFe)
    );

    // Find summaries that don't have corresponding complete documents
    const missingComplete = summaries.filter(
      (summary) => !completeChNFes.has(summary.json.resNFe.chNFe)
    );

    console.log("\nAnalysis Results:");
    console.log(`- Total nfe_summary documents: ${summaries.length}`);
    console.log(`- Total nfe_complete documents: ${completes.length}`);
    console.log(`- Missing complete documents: ${missingComplete.length}`);

    if (missingComplete.length > 0) {
      console.log("\nMissing chNFe values:");
      missingComplete.forEach((summary) => {
        console.log(
          `- ${summary.json.resNFe.chNFe} (Company: ${summary.companyName})`
        );
      });
    }
  }

  public async analyzeCollectionRelationships() {
    const connection = await this.getConnection();
    const summaryCollection = connection.collection("nfe_summary");
    const completeCollection = connection.collection("nfe_complete");
    const eventCollection = connection.collection("nfe_event");
    const otherCollection = connection.collection("other");

    // Get all documents from each collection
    const summaries = (await summaryCollection
      .find({})
      .toArray()) as unknown as NfeSummaryDto[];
    const completes = (await completeCollection
      .find({})
      .toArray()) as unknown as NfeComplete[];
    const events = (await eventCollection
      .find({})
      .toArray()) as unknown as NfeEvent[];
    const others = await otherCollection.find({}).toArray();

    console.log("\nCollection Sizes:");
    console.log(`- nfe_summary: ${summaries.length}`);
    console.log(`- nfe_complete: ${completes.length}`);
    console.log(`- nfe_event: ${events.length}`);
    console.log(`- other: ${others.length}`);

    // Create sets of chNFe for each collection
    const completeChNFes = new Set(
      completes.map((doc) => doc.json.nfeProc.protNFe.infProt.chNFe)
    );
    const eventChNFes = new Set(events.map((doc) => doc.json.resEvento.chNFe));
    const otherChNFes = new Set(
      others.map((doc) => doc.json?.chNFe).filter(Boolean)
    );

    // Analyze relationships
    const analysis = summaries.map((summary) => {
      const chNFe = summary.json.resNFe.chNFe;
      return {
        chNFe,
        companyName: summary.companyName,
        hasComplete: completeChNFes.has(chNFe),
        hasEvent: eventChNFes.has(chNFe),
        hasOther: otherChNFes.has(chNFe),
      };
    });

    // Group by company
    const byCompany = analysis.reduce((acc, item) => {
      if (!acc[item.companyName]) {
        acc[item.companyName] = {
          total: 0,
          withComplete: 0,
          withEvent: 0,
          withOther: 0,
        };
      }
      acc[item.companyName].total++;
      if (item.hasComplete) acc[item.companyName].withComplete++;
      if (item.hasEvent) acc[item.companyName].withEvent++;
      if (item.hasOther) acc[item.companyName].withOther++;
      return acc;
    }, {} as Record<string, { total: number; withComplete: number; withEvent: number; withOther: number }>);

    console.log("\nAnalysis by Company:");
    Object.entries(byCompany).forEach(([company, stats]) => {
      console.log(`\n${company}:`);
      console.log(`- Total documents: ${stats.total}`);
      console.log(
        `- With complete: ${stats.withComplete} (${(
          (stats.withComplete / stats.total) *
          100
        ).toFixed(1)}%)`
      );
      console.log(
        `- With event: ${stats.withEvent} (${(
          (stats.withEvent / stats.total) *
          100
        ).toFixed(1)}%)`
      );
      console.log(
        `- With other: ${stats.withOther} (${(
          (stats.withOther / stats.total) *
          100
        ).toFixed(1)}%)`
      );
    });

    // Find documents with all relationships
    const completeRelations = analysis.filter(
      (item) => item.hasComplete && item.hasEvent && item.hasOther
    );
    console.log(
      `\nDocuments with all relationships: ${completeRelations.length}`
    );
  }

  public async normalizeNfeCompletePayload() {
    const connection = await this.getConnection();
    const collection = connection.collection("nfe_complete");

    // Get all documents
    const documents = (await collection
      .find({})
      .toArray()) as unknown as NfeComplete[];
    console.log(`Found ${documents.length} documents to process`);

    let processed = 0;
    let errors = 0;

    for (const dto of documents) {
      try {
        // Convert to NfeComplete instance
        const nfeComplete = NfeComplete.fromDto(dto);

        // Update the document with normalized data
        await collection.updateOne(
          { _id: dto._id },
          { $set: { json: nfeComplete.json } }
        );

        processed++;
        if (processed % 100 === 0) {
          console.log(`Processed ${processed} documents...`);
        }
      } catch (error) {
        console.error(`Error processing document ${dto._id}:`, error);
        errors++;
      }
    }

    console.log(`\nProcessing complete:`);
    console.log(`- Total documents: ${documents.length}`);
    console.log(`- Successfully processed: ${processed}`);
    console.log(`- Errors: ${errors}`);
  }
}

const databaseManager = new DatabaseManager();
// databaseManager.normalizeNfeSummaryPayload().then(() => {
//   process.exit();
// });

// databaseManager.findMissingCompleteDocuments().then(() => {
//   process.exit();
// });

// databaseManager.analyzeCollectionRelationships().then(() => {
//   process.exit();
// });

databaseManager.normalizeNfeCompletePayload().then(() => {
  process.exit();
});
