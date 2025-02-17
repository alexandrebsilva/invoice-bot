interface DetEvento {
  descEvento: string;
  "@_versao": string;
}

interface CanonicalizationMethod {
  "@_Algorithm": string;
}

interface SignatureMethod {
  "@_Algorithm": string;
}

interface Transform {
  "@_Algorithm": string;
}

interface Transforms {
  Transform: Transform[];
}

interface DigestMethod {
  "@_Algorithm": string;
}

interface Reference {
  Transforms: Transforms;
  DigestMethod: DigestMethod;
  DigestValue: string;
  "@_URI": string;
}

interface SignedInfo {
  CanonicalizationMethod: CanonicalizationMethod;
  SignatureMethod: SignatureMethod;
  Reference: Reference;
}

interface X509Data {
  X509Certificate: string;
}

interface KeyInfo {
  X509Data: X509Data;
}

interface Signature {
  SignedInfo: SignedInfo;
  SignatureValue: string;
  KeyInfo: KeyInfo;
  "@_xmlns": string;
}

interface InfEvento {
  cOrgao: string;
  tpAmb: string;
  CNPJ: string;
  chNFe: string;
  dhEvento: string;
  tpEvento: string;
  nSeqEvento: string;
  verEvento: string;
  detEvento: DetEvento;
  "@_Id": string;
}

interface Evento {
  infEvento: InfEvento;
  Signature: Signature;
  "@_versao": string;
  "@_xmlns": string;
}

interface InfEvento2 {
  tpAmb: string;
  verAplic: string;
  cOrgao: string;
  cStat: string;
  xMotivo: string;
  chNFe: string;
  tpEvento: string;
  xEvento: string;
  nSeqEvento: string;
  CNPJDest: string;
  dhRegEvento: string;
  nProt: string;
  "@_Id": string;
}

interface RetEvento {
  infEvento: InfEvento2;
  "@_versao": string;
  "@_xmlns": string;
}

interface ProcEventoNFe {
  evento: Evento;
  retEvento: RetEvento;
  "@_versao": string;
  "@_xmlns": string;
}

interface Json {
  procEventoNFe: ProcEventoNFe;
}

export interface Other {
  _id: {
    $oid: string;
  };
  companyName: string;
  xml: string;
  json: Json;
  nsu: string;
  schema: string;
}
