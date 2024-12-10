/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./jest.setup.js'], // Use setupFilesAfterEnv instead of setupFiles
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {}],
  },
  transformIgnorePatterns: ['/node_modules/'],
};
