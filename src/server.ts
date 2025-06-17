import express, { Request, Response } from "express";
import DatabaseManager from "./database/database";

const app = express();
const port = process.env.PORT || 3000;
const databaseManager = new DatabaseManager();

// Middleware to parse JSON bodies
app.use(express.json());

// Route to get all NFE summaries
app.get("/api/nfe-summaries", async (req: Request, res: Response) => {
  try {
    const summaries = await databaseManager.findAll("nfe_summary");
    res.json({
      success: true,
      data: summaries,
    });
  } catch (error) {
    console.error("Error fetching NFE summaries:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error while fetching NFE summaries",
    });
  }
});

// Health check route
app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "ok" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
