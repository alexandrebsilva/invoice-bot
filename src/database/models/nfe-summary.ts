interface ResNFe {
  chNFe: string;
  CNPJ: string;
  xNome: string;
  IE: string;
  dhEmi: string | Date;
  tpNF: string;
  vNF: string | number;
  digVal: string;
  dhRecbto: string | Date;
  nProt: string;
  cSitNFe: string;
  "@_xmlns:xsd": string;
  "@_xmlns:xsi": string;
  "@_versao": string;
  "@_xmlns": string;
}

export interface NfeSummaryDto {
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

export class NfeSummary {
  _id: { $oid: string };
  companyName: string;
  xml: string;
  json: {
    resNFe: {
      chNFe: string;
      CNPJ: string;
      xNome: string;
      IE: string;
      dhEmi: Date;
      tpNF: string;
      vNF: number;
      digVal: string;
      dhRecbto: Date;
      nProt: string;
      cSitNFe: string;
      "@_xmlns:xsd": string;
      "@_xmlns:xsi": string;
      "@_versao": string;
      "@_xmlns": string;
    };
  };
  nsu: string;
  schema: string;

  constructor(data: NfeSummaryDto) {
    this._id = data._id;
    this.companyName = data.companyName;
    this.xml = data.xml;
    this.nsu = data.nsu;
    this.schema = data.schema;
    this.json = {
      resNFe: {
        ...data.json.resNFe,
        dhEmi: new Date(data.json.resNFe.dhEmi),
        vNF: Number(data.json.resNFe.vNF),
        dhRecbto: new Date(data.json.resNFe.dhRecbto),
      },
    };
  }

  static fromDto(dto: NfeSummaryDto): NfeSummary {
    return new NfeSummary(dto);
  }
}
