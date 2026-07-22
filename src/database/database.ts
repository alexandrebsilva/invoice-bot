import mongoose, { Connection, Mongoose } from "mongoose";
import { AvailableCompaniesNames } from "../configs/companies";
import { NfeSummary } from "./models/nfe-summary";
import { DetItem, NfeComplete } from "./models/nfe-complete";

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

  async function start(startParams: StartParams): Promise<void> {
    const distribuicao = new DistribuicaoDFe({
      pfx: readFileSync(startParams.certPath),
      passphrase: startParams.passphrase,
      cnpj: startParams.cnpj,
      cUFAutor: "35",
      tpAmb: "1",
    });
  
    const databaseManager = new DatabaseManager();
    try {
      let continuar = true;
  
      while (continuar) {
        let nsu = await databaseManager.findLast(
          "interactions",
          startParams.companyName
        );
  
        nsu = nsu || "000000000000000";
  
        const resposta = await distribuicao.consultaUltNSU(nsu);
        if (resposta.error) {
          throw new Error(resposta.error);
        }
  
        const { cStat, ultNSU, xMotivo, tpAmb } = resposta.data;
  
        console.log(`Recebido cStat: ${cStat}, NSU: ${nsu}, date: ${new Date()}`);
  
        switch (+cStat) {
          case 137:
            console.log("Nenhum documento localizado. Aguardando 1 hora...");
            await delay(3600000); // Pausa de 1 hora
            break;
          case 138:
            console.log("Documento localizado. Reconsultando em 1 segundo...");
            break;
          case 656:
            console.log("Uso indevido. Rebuscando notas em 1 hora");
            await delay(3600000); // Pausa de 1 hora
            break;
          case 100:
            console.log(`Nota processada com sucesso! NSU: ${nsu}`);
            break;
          default:
            console.log("Código desconhecido. Finalizando...");
            continuar = false; // Encerra o loop para códigos não tratados
            break;
        }
  
        for (const element of resposta.data.docZip) {
          const type = element.json.resNFe
            ? "nfe_summary"
            : element.json.resEvento
            ? "nfe_event"
            : element.json.nfeProc
            ? "nfe_complete"
            : "other";
  
          await databaseManager.save(type, {
            companyName: startParams.companyName,
            ...element,
          });
        }
  
        await databaseManager.save("interactions", {
          cStat,
          nsu,
          ultNSU: ultNSU,
          xMotivo,
          tpAmb,
          createdAt: new Date(),
          companyName: startParams.companyName,
          success: [137, 138, 100].includes(+cStat),
        });
      }
    } catch (error) {
      console.error("Erro ao consultar o SEFAZ:", error);
    }
  }
  


export default DatabaseManager;
