module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    "^[./a-zA-Z0-9$_-]+\\.css$": "<rootDir>/src/assets/mock.css.ts",
  }
};
