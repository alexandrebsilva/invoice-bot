interface NfeComplete {
  _id: {
    $oid: string;
  };
  companyName: string;
  xml: string;
  json: {
    nfeProc: {
      NFe: {
        infNFe: {
          ide: {
            cUF: string;
            cNF: string;
            natOp: string;
            mod: string;
            serie: string;
            nNF: string;
            dhEmi: string;
            dhSaiEnt: string;
            tpNF: string;
            idDest: string;
            cMunFG: string;
            tpImp: string;
            tpEmis: string;
            cDV: string;
            tpAmb: string;
            finNFe: string;
            indFinal: string;
            indPres: string;
            indIntermed: string;
            procEmi: string;
            verProc: string;
          };
          emit: {
            CNPJ: string;
            xNome: string;
            xFant: string;
            enderEmit: {
              xLgr: string;
              nro: string;
              xCpl: string;
              xBairro: string;
              cMun: string;
              xMun: string;
              UF: string;
              CEP: string;
              cPais: string;
              xPais: string;
              fone: string;
            };
            IE: string;
            CRT: string;
          };
          dest: {
            CNPJ: string;
            xNome: string;
            enderDest: {
              xLgr: string;
              nro: string;
              xBairro: string;
              cMun: string;
              xMun: string;
              UF: string;
              CEP: string;
              cPais: string;
              xPais: string;
            };
            indIEDest: string;
            IE: string;
          };
          entrega: {
            CNPJ: string;
            xLgr: string;
            nro: string;
            xBairro: string;
            cMun: string;
            xMun: string;
            UF: string;
            CEP: string;
          };
          det: Array<{
            prod: {
              cProd: string;
              cEAN: string;
              xProd: string;
              NCM: string;
              CFOP: string;
              uCom: string;
              qCom: string;
              vUnCom: string;
              vProd: string;
              cEANTrib: string;
              uTrib: string;
              qTrib: string;
              vUnTrib: string;
              indTot: string;
              xPed: string;
              nItemPed: string;
            };
            imposto: {
              vTotTrib: string;
              ICMS: {
                ICMS20?: {
                  orig: string;
                  CST: string;
                  modBC: string;
                  pRedBC: string;
                  vBC: string;
                  pICMS: string;
                  vICMS: string;
                };
                ICMS00?: {
                  orig: string;
                  CST: string;
                  modBC: string;
                  vBC: string;
                  pICMS: string;
                  vICMS: string;
                };
                ICMS40?: {
                  orig: string;
                  CST: string;
                };
              };
              IPI: {
                cEnq: string;
                IPITrib: {
                  CST: string;
                  vBC: string;
                  pIPI: string;
                  vIPI: string;
                };
              };
              PIS: {
                PISNT?: {
                  CST: string;
                };
                PISAliq?: {
                  CST: string;
                  vBC: string;
                  pPIS: string;
                  vPIS: string;
                };
              };
              COFINS: {
                COFINSNT?: {
                  CST: string;
                };
                COFINSAliq?: {
                  CST: string;
                  vBC: string;
                  pCOFINS: string;
                  vCOFINS: string;
                };
              };
            };
            "@_nItem": string;
            infAdProd?: string;
          }>;
          total: {
            ICMSTot: {
              vBC: string;
              vICMS: string;
              vICMSDeson: string;
              vFCP: string;
              vBCST: string;
              vST: string;
              vFCPST: string;
              vFCPSTRet: string;
              qBCMono: string;
              vICMSMono: string;
              qBCMonoReten: string;
              vICMSMonoReten: string;
              qBCMonoRet: string;
              vICMSMonoRet: string;
              vProd: string;
              vFrete: string;
              vSeg: string;
              vDesc: string;
              vII: string;
              vIPI: string;
              vIPIDevol: string;
              vPIS: string;
              vCOFINS: string;
              vOutro: string;
              vNF: string;
              vTotTrib: string;
            };
          };
          transp: {
            modFrete: string;
            transporta: {
              CNPJ: string;
              xNome: string;
              IE: string;
              xEnder: string;
              xMun: string;
              UF: string;
            };
            vol: {
              qVol: string;
              nVol: string;
              pesoL: string;
              pesoB: string;
            };
          };
          cobr: {
            fat: {
              nFat: string;
              vOrig: string;
              vDesc: string;
              vLiq: string;
            };
            dup: {
              nDup: string;
              dVenc: string;
              vDup: string;
            };
          };
          pag: {
            detPag: {
              indPag: string;
              tPag: string;
              vPag: string;
            };
          };
          infAdic: {
            infCpl: string;
          };
          compra: {
            xPed: string;
          };
          infRespTec: {
            CNPJ: string;
            xContato: string;
            email: string;
            fone: string;
          };
          "@_Id": string;
          "@_versao": string;
        };
        Signature: {
          SignedInfo: {
            CanonicalizationMethod: {
              "@_Algorithm": string;
            };
            SignatureMethod: {
              "@_Algorithm": string;
            };
            Reference: {
              Transforms: {
                Transform: Array<{
                  "@_Algorithm": string;
                }>;
              };
              DigestMethod: {
                "@_Algorithm": string;
              };
              DigestValue: string;
              "@_URI": string;
            };
          };
          SignatureValue: string;
          KeyInfo: {
            X509Data: {
              X509Certificate: string;
            };
          };
          "@_xmlns": string;
        };
        "@_xmlns": string;
      };
      protNFe: {
        infProt: {
          tpAmb: string;
          verAplic: string;
          chNFe: string;
          dhRecbto: string;
          nProt: string;
          digVal: string;
          cStat: string;
          xMotivo: string;
          "@_Id": string;
        };
        "@_versao": string;
      };
      "@_versao": string;
      "@_xmlns": string;
    };
  };
  nsu: string;
  schema: string;
}
