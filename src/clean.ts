import fs from "fs";
import path from "path";

const folders = [
  "nfes/NFEs_completa",
  "nfes/NFEs_evento",
  "nfes/NFEs_outro",
  "nfes/NFEs_resumo",
];

folders.forEach((folder) => {
  const folderPath = path.join(__dirname, "..", folder);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
    console.log(`Created folder: ${folderPath}`);
  } else {
    console.log(`Folder already exists: ${folderPath}`);
    fs.readdirSync(folderPath).forEach((file) => {
      const filePath = path.join(folderPath, file);
      fs.unlinkSync(filePath);
      console.log(`Deleted file: ${filePath}`);
    });
  }
});
