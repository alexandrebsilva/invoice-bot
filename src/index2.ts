import { DistribuicaoDFe } from "node-mde";
import { readFileSync } from "fs";

interface ConsultaResponse {
  error?: string;
  [key: string]: any;
}

async function main() {
  try {
    const distribuicao = new DistribuicaoDFe({
      pfx: readFileSync("./certs/DATAGARFO.pfx"),
      cnpj: "57278972000160",
      passphrase: "12345678",
      cUFAutor: "35",
      tpAmb: "1",
    });

    const consulta: ConsultaResponse = await distribuicao.consultaUltNSU(
      "000000000000000"
    );

    if (consulta.error) {
      throw new Error(consulta.error);
    }

    console.log(consulta);
  } catch (error) {
    console.error(
      "Error during consultation:",
      error instanceof Error ? error.message : error
    );
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("Unhandled error:", error);
  process.exit(1);
});
