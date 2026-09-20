import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  ...nextVitals,
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "tmp/**",
    ],
  },
  {
    files: ["src/**/*.{js,jsx}"],
    rules: {
      // Production hygiene — treat these as errors so they never ship
      "no-console": "error",
      "no-unused-vars": [
        "error",
        { args: "none", caughtErrors: "none", ignoreRestSiblings: true },
      ],
    },
  },
];

export default eslintConfig;
