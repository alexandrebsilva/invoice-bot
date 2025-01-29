import { DistribuicaoDFe } from "node-mde";
import fs from "fs";

// Função para delay (pausa) em milissegundos
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
type StartParams = {
  passphrase: string;
  certPath: string;
  cnpj?: string;
  cUFAutor?: string;
  tpAmb?: string;
};

async function start(startParams: StartParams): Promise<void> {
  const distribuicao = new DistribuicaoDFe({
    pfx: fs.readFileSync(startParams.certPath),
    passphrase: startParams.passphrase,
    cnpj: startParams.cnpj,
    cUFAutor: "35",
    tpAmb: "1",
  });

  try {
    let continuar = true;
    let currentNsu = "000000000000000";

    while (continuar) {
      const resposta = await distribuicao.consultaUltNSU(currentNsu);
      const { cStat, ultNSU } = resposta.data;

      console.log(`Recebido cStat: ${cStat}, NSU: ${ultNSU}`);

      switch (+cStat) {
        case 137:
          console.log("Nenhum documento localizado. Aguardando 1 hora...");
          await delay(3600000); // Pausa de 1 hora
          break;
        case 656:
          console.log("Uso indevido. Rebuscando notas em 1 hora");
          await delay(3600000); // Pausa de 1 hora
          break;
        case 138:
          console.log("Documento localizado. Reconsultando em 1 segundo...");
          await delay(1000); // Pausa de 1 segundo
          break;
        case 100:
          console.log(`Nota processada com sucesso! NSU: ${currentNsu}`);
          continuar = false; // Encerra o loop
          break;
        default:
          console.log("Código desconhecido. Finalizando...");
          continuar = false; // Encerra o loop para códigos não tratados
          break;
      }

      resposta.data.docZip.forEach((element) => {
        const type = element.json.resNFe
          ? "NFEs_resumo"
          : element.json.resEvento
          ? "NFEs_evento"
          : element.json.nfeProc
          ? "NFEs_completa"
          : "NFEs_outro";

        fs.writeFileSync(
          `nfes/${type}/${element.nsu}.json`,
          JSON.stringify(element),
          "utf8"
        );
      });

      currentNsu = ultNSU;
    }
  } catch (error) {
    console.error("Erro ao consultar o SEFAZ:", error);
  }
}

start();
