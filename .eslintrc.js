module.exports = {
  env: {
    jest: true,
  },
  extends: ["airbnb-typescript-prettier"],
  settings: {
    "import/resolver": {
      typescript: {}, // this loads <rootdir>/tsconfig.json to eslint
    },
  },
  rules: {
    "prettier/prettier": [
      "error",
      {
        trailingComma: "es5",
        singleQuote: false,
        printWidth: 80,
        bracketSpacing: true,
        jsxBracketSameLine: false,
        tabWidth: 2,
        semi: true,
      },
    ],
    "react/jsx-filename-extension": [
      1,
      {
        extensions: ["ts", "tsx"],
      },
    ],
    "react/jsx-props-no-spreading": 0,
    "import/prefer-default-export": 0,
  },
};
