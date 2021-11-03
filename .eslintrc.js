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
  plugins: ["filenames"],
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
        endOfLine: "auto",
      },
    ],
    "react/jsx-filename-extension": [
      1,
      {
        extensions: ["ts", "tsx"],
      },
    ],
    "react/react-in-jsx-scope": 0,
    "react/jsx-props-no-spreading": 0,
    "react/require-default-props": 0,
    "import/prefer-default-export": 0,
    "no-unused-expressions": "off",
    // disabling circular dependency, as it is causing issues
    "import/no-cycle": 0,
    // allow param reassign for redux-toolkit
    "no-param-reassign": ["error", { props: false }],
    // no return types needed if it can be inferred. useful for react components and sagas so it's less to worry about
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/prefer-nullish-coalescing": "error",
    "@typescript-eslint/prefer-optional-chain": "error",
    "react/button-has-type": 0,
    "import/no-extraneous-dependencies": [
      "error",
      { devDependencies: ["**/*.stories.tsx"] },
    ],
    "no-restricted-imports": [
      "error",
      {
        patterns: ["@app/features/*/*/*"],
      },
    ],
    "import/order": [
      "error",
      {
        "newlines-between": "always",
        groups: [
          ["builtin", "external"],
          "internal",
          ["parent", "sibling", "index"],
          "unknown",
        ],
        alphabetize: { order: "asc" },
        pathGroups: [
          {
            pattern: "styles/**",
            group: "internal",
            position: "after",
          },
          { group: "builtin", pattern: "react", position: "before" },
        ],
        pathGroupsExcludedImportTypes: ["builtin"],
      },
    ],
  },
  overrides: [
    {
      files: ["*.ts"],
      rules: {
        "filenames/match-regex": [2, "^[a-z-.]+$", true],
      },
    },
    {
      files: ["*.tsx"],
      rules: {
        "filenames/match-regex": [2, "^[A-Z][a-z].+(?:[A-Z][a-z].+)*$", true],
      },
    },
    {
      files: ["src/index.tsx", "src/reportWebVitals.ts", "src/setupTests.ts"],
      rules: {
        "filenames/match-regex": "off",
      },
    },
  ],
};
