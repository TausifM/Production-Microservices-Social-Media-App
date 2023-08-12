module.exports = {
  extends: [
    "airbnb-typescript/base",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "eslint:recommended"
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["import", "prettier", "@typescript-eslint"],
  overrides: [
    {
      files: ["*.ts", "*.tsx"], // Your TypeScript files extension

      // As mentioned in the comments, you should extend TypeScript plugins here,
      // instead of extending them outside the `overrides`.
      // If you don't want to extend any rules, you don't need an `extends` attribute.
      extends: [
        "plugin:@typescript-eslint/recommended",
        // "plugin:@typescript-eslint/recommended-requiring-type-checking"
      ],

      parserOptions: {
        project: ["./tsconfig.json"], // Specify it only for TypeScript files
        tsconfigRootDir: __dirname,
        sourceType: "module"
      }
    }
  ],
  // parserOptions: {
  //   project: "tsconfig.json",
  //   tsconfigRootDir: __dirname,
  //   sourceType: "module"
  // },
  rules: {
    // quotes: [
    //   'error',
    //   'single',
    //   { avoidEscape: true, allowTemplateLiterals: true },
    // ],
    "import/prefer-default-export": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "import/no-extraneous-dependencies": "off",
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "no-underscore-dangle": ["error", { allow: ["_id", "_update"] }],
    "class-methods-use-this": "off",
    "@typescript-eslint/no-non-null-assertion": "off"
  }
};
