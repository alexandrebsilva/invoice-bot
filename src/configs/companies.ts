export type AvailableCompaniesNames =
  | "ALGOREATS"
  | "DATAGARFO"
  | "CROAREALIDADE";

export type Company = {
  cnpj: string;
  companyName: AvailableCompaniesNames;
  passphrase: string;
  certPath: string;
};
export const COMPANIES: { [key: string]: Company } = {
  ALGOREATS: {
    cnpj: "54858948000101",
    companyName: "ALGOREATS",
    passphrase: "12345678",
    certPath: "./certs/ALGOREATS.pfx",
  },
  DATAGARFO: {
    cnpj: "57278972000160",
    companyName: "DATAGARFO",
    passphrase: "12345678",
    certPath: "./certs/DATAGARFO.pfx",
  },
  CROAREALIDADE: {
    cnpj: "58412530000127",
    companyName: "CROAREALIDADE",
    passphrase: "12345678",
    certPath: "./certs/CROAREALIDADE.pfx",
  },
};
