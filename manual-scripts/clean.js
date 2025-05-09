"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const folders = [
    "nfes/NFEs_completa",
    "nfes/NFEs_evento",
    "nfes/NFEs_outro",
    "nfes/NFEs_resumo",
];
folders.forEach((folder) => {
    const folderPath = path_1.default.join(__dirname, "..", folder);
    if (!fs_1.default.existsSync(folderPath)) {
        fs_1.default.mkdirSync(folderPath, { recursive: true });
        console.log(`Created folder: ${folderPath}`);
    }
    else {
        console.log(`Folder already exists: ${folderPath}`);
        fs_1.default.readdirSync(folderPath).forEach((file) => {
            const filePath = path_1.default.join(folderPath, file);
            fs_1.default.unlinkSync(filePath);
            console.log(`Deleted file: ${filePath}`);
        });
    }
});
