const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    "plugin:@typescript-eslint/recommended",
    "eslint:recommended",
    "prettier",
    "eslint-config-turbo",
  ],
  env: {
    node: true,
    jest: true,
  },
  plugins: [
    "@typescript-eslint/eslint-plugin",
    "only-warn",
    "simple-import-sort",
    "import",
  ],
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  parserOptions: {
    sourceType: "module",
    ecmaVersion: "latest",
  },
  ignorePatterns: [
    // Ignore dotfiles
    ".*.js",
    "node_modules/",
  ],
  overrides: [{ files: ["*.js?(x)", "*.ts?(x)"] }],
  rules: {
    "no-unused-vars": "off",
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "off",
  },
};
