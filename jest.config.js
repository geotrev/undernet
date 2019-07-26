module.exports = {
  clearMocks: true,
  restoreMocks: true,
  moduleNameMapper: {
    "\\.(css|scss)$": "<rootDir>/tests/__mocks__/emptyMock.js",
    "\\.(jpg|jpeg|png|gif|md|eot|otf|webp|svg|ttf|woff|woff2)$":
      "<rootDir>/tests/__mocks__/emptyMock.js",
    "^projectRoot(.*?)$": "<rootDir>/$1",
    "^app(.*?)$": "<rootDir>/app/$1",
    "^undernet(.*?)$": "<rootDir>/lib/esm/$1",
  },
  roots: ["<rootDir>/app/", "<rootDir>/src/js/"],
  setupFiles: ["<rootDir>/tests/jest.setup.js"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  testMatch: ["<rootDir>/app/**/__tests__/*.spec.js", "<rootDir>/src/js/__tests__/*.spec.js"],
  testURL: "http://localhost/",
  transform: { "^.+\\.js$": "babel-jest" },
  unmockedModulePathPatterns: ["node_modules/react/", "node_modules/enzyme/"],
  verbose: false,
}