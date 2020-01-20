module.exports = {
  clearMocks: true,
  collectCoverageFrom: ["<rootDir>/src/**/*.js"],
  restoreMocks: true,
  moduleNameMapper: {
    "\\.(css|scss)$": "<rootDir>/.jest/__mocks__/emptyMock.js",
    "\\.(jpg|jpeg|png|gif|md|eot|otf|webp|svg|ttf|woff|woff2)$":
      "<rootDir>/.jest/__mocks__/emptyMock.js",
  },
  testMatch: ["<rootDir>/src/**/__tests__/*.spec.js"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  testURL: "http://localhost/",
  transform: { "^.+\\.js$": "babel-jest" },
  verbose: false,
}
