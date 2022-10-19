/** @type {import('jest').Config} */
const config = {
  setupFilesAfterEnv: ["<rootDir>/setup-jest.js"],
  testEnvironment: "node",
  testMatch: ["**/**/*.test.ts"],
  verbose: true,
  forceExit: true,
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
};

module.exports = config;
