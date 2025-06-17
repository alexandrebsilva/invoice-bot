type DetItem = {
  prod: {
    cProd: string;
    cEAN: string;
    xProd: string;
    NCM: string;
    CFOP: string;
    uCom: string | number;
    qCom: string | number;
    vUnCom: string | number;
    vProd: string | number;
    cEANTrib: string;
    uTrib: string;
    qTrib: string;
    vUnTrib: number;
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
};

export interface NfeComplete {
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
            dhEmi: string | Date;
            dhSaiEnt: string | Date;
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
          det: DetItem[] | DetItem;
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
              vNF: string | number;
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
          dhRecbto: string | Date;
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

interface TransformedNfeComplete {
  _id: { $oid: string };
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
            dhEmi: string | Date;
            dhSaiEnt: string | Date;
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
          det: DetItem[] | DetItem;
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
              vNF: string | number;
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
          dhRecbto: string | Date;
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

export class NfeComplete implements TransformedNfeComplete {
  _id: { $oid: string };
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
            dhEmi: string | Date;
            dhSaiEnt: string | Date;
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
          det: DetItem[] | DetItem;
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
              vNF: string | number;
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
          dhRecbto: string | Date;
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

  constructor(data: NfeComplete) {
    this._id = data._id;
    this.companyName = data.companyName;
    this.xml = data.xml;
    this.nsu = data.nsu;
    this.schema = data.schema;
    this.json = {
      nfeProc: {
        ...data.json.nfeProc,
        NFe: {
          ...data.json.nfeProc.NFe,
          infNFe: {
            ...data.json.nfeProc.NFe.infNFe,
            ide: {
              ...data.json.nfeProc.NFe.infNFe.ide,
              dhEmi: new Date(data.json.nfeProc.NFe.infNFe.ide.dhEmi),
              dhSaiEnt: new Date(data.json.nfeProc.NFe.infNFe.ide.dhSaiEnt),
            },
            det: Array.isArray(data.json.nfeProc.NFe.infNFe.det)
              ? data.json.nfeProc.NFe.infNFe.det.map((item) => ({
                  ...item,
                  prod: {
                    ...item.prod,
                    qCom: Number(item.prod.qCom),
                    vUnCom: Number(item.prod.vUnCom),
                    vProd: Number(item.prod.vProd),
                    vUnTrib: Number(item.prod.vUnTrib),
                  },
                }))
              : {
                  ...data.json.nfeProc.NFe.infNFe.det,
                  prod: {
                    ...data.json.nfeProc.NFe.infNFe.det.prod,
                    qCom: Number(data.json.nfeProc.NFe.infNFe.det.prod.qCom),
                    vUnCom: Number(
                      data.json.nfeProc.NFe.infNFe.det.prod.vUnCom
                    ),
                    vProd: Number(data.json.nfeProc.NFe.infNFe.det.prod.vProd),
                    vUnTrib: Number(
                      data.json.nfeProc.NFe.infNFe.det.prod.vUnTrib
                    ),
                  },
                },
          },
        },
        protNFe: {
          ...data.json.nfeProc.protNFe,
          infProt: {
            ...data.json.nfeProc.protNFe.infProt,
            dhRecbto: new Date(data.json.nfeProc.protNFe.infProt.dhRecbto),
          },
        },
      },
    };
  }

  static fromDto(dto: NfeComplete): NfeComplete {
    console.log(dto.json.nfeProc.protNFe.infProt.chNFe);
    return new NfeComplete(dto);
  }
}
