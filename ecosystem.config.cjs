module.exports = {
  apps: [
    {
      name: "BARAB-REACT",
      script: "node_modules/.bin/serve",
      args: "-s dist -l 80",
      interpreter: "none",
      windowsHide: true,
    },
  ],
}
