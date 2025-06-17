export interface NfeEvent {
  _id: {
    $oid: string;
  };
  companyName: string;
  json: {
    resEvento: {
      cOrgao: string;
      CNPJ: string;
      chNFe: string;
      dhEvento: string;
      tpEvento: string;
      nSeqEvento: string;
      xEvento: string;
      dhRecbto: string;
      nProt: string;
      "@_xmlns:xsd": string;
      "@_xmlns:xsi": string;
      "@_versao": string;
      "@_xmlns": string;
    };
  };
  nsu: string;
  schema: string;
}
