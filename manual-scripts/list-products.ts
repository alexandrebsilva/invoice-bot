import * as fs from "fs";
import * as path from "path";
import DatabaseManager from "../src/database/database";
import { AvailableCompaniesNames } from "../src/configs/companies";
import { DetItem } from "../src/database/models/nfe-complete";

async function listAllProducts(companyName: AvailableCompaniesNames) {
  const databaseManager = new DatabaseManager();
  const products = await databaseManager.findAllProducts(companyName);
  const outputDir = path.resolve(__dirname, "output");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }
  const filePath = path.join(outputDir, `${companyName}_products.txt`);
  const productLines = products.map((product: DetItem) => {
    console.log(Object.entries(product));
    return product.prod;
  });
  fs.writeFileSync(filePath, productLines.join("\n"), "utf-8");
}

async function start() {
  await listAllProducts("ALGOREATS");
  // await listAllProducts("DATAGARFO");
  // await listAllProducts("CROAREALIDADE");
}

start();
