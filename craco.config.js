const path = require("path");
const CracoAntDesignPlugin = require("craco-antd");
const theme = require("./src/styles/antd-theme");

module.exports = {
  webpack: {
    alias: {
      "@app": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeTheme: theme,
      },
      lessLoaderOptions: {
        noIeCompat: true,
      },
    },
  ],
};
