import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "no-unused-vars": "off",
      "no-shadow": "off",
      "no-undef": "off",
      "no-var": ["warn"],
      eqeqeq: ["warn", "always"],
      "no-console": ["off"],

      "@typescript-eslint/no-unused-vars": ["warn"],
      "@typescript-eslint/no-shadow": ["warn"],
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
];
