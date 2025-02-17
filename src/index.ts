// import { DistribuicaoDFe } from "node-mde";
// import fs from "fs";
// import { COMPANIES, Company } from "./configs/companies";
// import { delay } from "./helpers/delay";

import DatabaseManager from "./helpers/database";

// import DatabaseManager from "./helpers/database";

// type StartParams = Company & {
//   cUFAutor?: string;
//   tpAmb?: string;
// };

// async function start(startParams: StartParams): Promise<void> {
//   const distribuicao = new DistribuicaoDFe({
//     pfx: fs.readFileSync(startParams.certPath),
//     passphrase: startParams.passphrase,
//     cnpj: startParams.cnpj,
//     cUFAutor: "35",
//     tpAmb: "1",
//   });

//   try {
//     let continuar = true;
//     let currentNsu = await DatabaseManager.getLastInteractionNsu(
//       startParams.companyName
//     );

//     while (continuar) {
//       const resposta = await distribuicao.consultaUltNSU(currentNsu);

//       const { cStat, ultNSU, xMotivo, tpAmb } = resposta.data;
//       await DatabaseManager.saveDocument("interactions", {
//         cStat,
//         ultNSU,
//         xMotivo,
//         tpAmb,
//         createdAt: new Date(),
//         companyName: startParams.companyName,
//       });

//       console.log(`Recebido cStat: ${cStat}, NSU: ${ultNSU}`);

//       switch (+cStat) {
//         case 137:
//           console.log("Nenhum documento localizado. Aguardando 1 hora...");
//           await delay(3600000); // Pausa de 1 hora
//           continuar = false;
//           break;
//         case 656:
//           console.log("Uso indevido. Rebuscando notas em 1 hora");
//           console.log(resposta);

//           await delay(3600000); // Pausa de 1 hora
//           break;
//         case 138:
//           console.log("Documento localizado. Reconsultando em 1 segundo...");
//           await delay(1000); // Pausa de 1 segundo
//           break;
//         case 100:
//           console.log(`Nota processada com sucesso! NSU: ${currentNsu}`);
//           continuar = false; // Encerra o loop
//           break;
//         default:
//           console.log("Código desconhecido. Finalizando...");
//           continuar = false; // Encerra o loop para códigos não tratados
//           break;
//       }

//       await Promise.all(
//         resposta.data.docZip.map(async (element) => {
//           const type = element.json.resNFe
//             ? "nfe_summary"
//             : element.json.resEvento
//             ? "nfe_event"
//             : element.json.nfeProc
//             ? "nfe_complete"
//             : "other";
//           //
//           await DatabaseManager.saveDocument(type, {
//             companyName: startParams.companyName,
//             ...element,
//           });
//           //
//           // fs.writeFileSync(
//           //   `nfes/${type}/${element.nsu}.json`,
//           //   JSON.stringify(element),
//           //   "utf8"
//           // );
//         })
//       );
//     }
//   } catch (error) {
//     console.error("Erro ao consultar o SEFAZ:", error);
//   }
// }
// //
// start({ ...COMPANIES.DATAGARFO });
// //

DatabaseManager.saveDocument("interactions", { teste: "teste" });
