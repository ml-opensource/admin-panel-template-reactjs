const path = require("path");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const CracoAntDesignPlugin = require("craco-antd");
const theme = require("./src/styles/antd-theme");

module.exports = {
  webpack: {
    alias: {
      "@app": path.resolve(__dirname, "./src"),
    },
    plugins: [
      ...(process.env.ENABLE_ANALYZER
        ? [
            new BundleAnalyzerPlugin({
              analyzerMode: "static",
              openAnalyzer: true,
            }),
          ]
        : []),
    ],
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
  style: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
};
