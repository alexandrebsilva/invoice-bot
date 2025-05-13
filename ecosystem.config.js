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
    watch: ["src"],
    env: { COMPANY: "ALGOREATS" },
  },
  {
    ...commonParams,
    name: "DATAGARFO",
    watch: ["src"],
    env: { COMPANY: "DATAGARFO" },
  },
  {
    ...commonParams,
    name: "CROAREALIDADE",
    watch: ["src"],
    env: { COMPANY: "CROAREALIDADE" },
  },
];

module.exports = {
  apps,
};
