const nextJest = require("next/jest");

// Providing the path to your Next.js app which will enable loading next.config.js and .env files
const createJestConfig = nextJest({ dir: "./" });

// Any custom config you want to pass to Jest
const customJestConfig = {
  moduleDirectories: ["node_modules", __dirname],
  preset: "ts-jest",
  setupFilesAfterEnv: ["./jest.setup.js"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": ["ts-jest", {}],
  },
  transformIgnorePatterns: ["/node_modules/"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/app/$1", // Updated path mapping to match tsconfig.json
  },
  rootDir: ".", // Explicitly set root directory
};

module.exports = createJestConfig(customJestConfig);
