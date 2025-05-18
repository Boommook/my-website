import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({extends: ["next/core-web-vitals", "next/typescript"],
    rules: {"react/no-unescaped-entities": "off", // Disable unescaped entities rule
            "@typescript-eslint/no-unused-vars": "off", // Disable unused vars warning
            "react/jsx-key": "warn" // Optional: can change it to 'off' if you don't want key warnings
    },
  })
];

export default eslintConfig;
