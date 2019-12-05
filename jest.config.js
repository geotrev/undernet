module.exports = {
  clearMocks: true,
  collectCoverageFrom: ["<rootDir>/app/**/*.js", "<rootDir>/src/js/**/*.js"],
  restoreMocks: true,
  moduleNameMapper: {
    "\\.(css|scss)$": "<rootDir>/.jest/__mocks__/emptyMock.js",
    "\\.(jpg|jpeg|png|gif|md|eot|otf|webp|svg|ttf|woff|woff2)$":
      "<rootDir>/.jest/__mocks__/emptyMock.js",
    "^projectRoot(.*?)$": "<rootDir>/$1",
    "^app(.*?)$": "<rootDir>/app/$1",
    "^undernet(.*?)$": "<rootDir>/lib/esm/$1",
  },
  testMatch: ["<rootDir>/app/**/__tests__/*.spec.js", "<rootDir>/src/**/__tests__/*.spec.js"],
  setupFiles: ["<rootDir>/.jest/jest.setup.js"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  testURL: "http://localhost/",
  transform: { "^.+\\.js$": "babel-jest" },
  unmockedModulePathPatterns: ["node_modules/react/", "node_modules/enzyme/"],
  verbose: false,
}
