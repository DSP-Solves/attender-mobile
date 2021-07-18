module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "airbnb"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    quotes: ["error", "double"],
    "linebreak-style": ["error", "windows"],
    "react/forbid-prop-types": ["warn"],
    "implicit-arrow-linebreak": "off",
    "react/jsx-curly-newline": "off",
    "object-curly-newline": "off",
    "react/prop-types": [
      "error",
      { ignore: ["navigation", "route", "style"] },
    ],
    "no-console":
      process.env.NODE_ENV === "production" ? "error" : "off",
  },
};
