interface ResNFe {
  chNFe: string;
  CNPJ: string;
  xNome: string;
  IE: string;
  dhEmi: string;
  tpNF: string;
  vNF: string;
  digVal: string;
  dhRecbto: string;
  nProt: string;
  cSitNFe: string;
  "@_xmlns:xsd": string;
  "@_xmlns:xsi": string;
  "@_versao": string;
  "@_xmlns": string;
}

export interface NfeSummary {
  _id: {
    $oid: string;
  };
  companyName: string;
  xml: string;
  json: {
    resNFe: ResNFe;
  };
  nsu: string;
  schema: string;
}
