module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  globals: {
    process: true,
  },
  extends: [],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: [],
  rules: {
    "*": "off", // Nonaktifkan semua aturan secara global
  },
};
