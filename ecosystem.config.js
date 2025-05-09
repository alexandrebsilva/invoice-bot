const commonParams = {
  script: "./src/index.ts",
  instances: 1,
  exec_mode: "cluster",
  interpreter: "ts-node",
};

const apps = [
  {
    ...commonParams,
    name: "ALGOREATS",
    env: { COMPANY: "ALGOREATS" },
  },
  {
    ...commonParams,
    name: "DATAGARFO",
    env: { COMPANY: "DATAGARFO" },
  },
  {
    ...commonParams,
    name: "CROAREALIDADE",
    env: { COMPANY: "CROAREALIDADE" },
  },
];

module.exports = {
  apps,
};
