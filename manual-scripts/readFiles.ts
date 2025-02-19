import * as fs from "fs";
import * as path from "path";
import DatabaseManager from "../src/helpers/database";

const directoryPath = path.join(__dirname, "../data");
const companyFolders = ["nfe-complete", "nfe-event", "other", "nfe-summary"];

async function readFilesForCompany(companyName: string) {
  const databaseManager = new DatabaseManager();
  companyFolders.forEach((folder) => {
    const folderPath = path.join(directoryPath, companyName, folder);
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        return console.log("Unable to scan directory: " + err);
      }

      files.forEach((file) => {
        if (path.extname(file) === ".json") {
          const filePath = path.join(folderPath, file);
          fs.readFile(filePath, "utf8", (err, data) => {
            if (err) {
              return console.log("Unable to read file: " + err);
            }
            try {
              const jsonData = JSON.parse(data);
              databaseManager.save(folder, {
                companyName,
                ...jsonData,
                nsu: "ARCHIVED",
              });
            } catch (parseErr) {
              console.log("Error parsing JSON: " + parseErr);
            }
          });
        }
      });
    });
  });
}

async function start() {
  await readFilesForCompany("ALGOREATS");
  await readFilesForCompany("DATAGARFO");
}

start();
