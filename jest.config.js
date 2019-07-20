module.exports = {
  clearMocks: true,
  restoreMocks: true,
  moduleNameMapper: {
    "\\.(css|scss)$": "<rootDir>/test/__mocks__/emptyMock.js",
    "\\.(jpg|jpeg|png|gif|md|eot|otf|webp|svg|ttf|woff|woff2)$":
      "<rootDir>/test/__mocks__/emptyMock.js",
    "^projectRoot/(.*?)$": "<rootDir>/$1",
    "^routes/(.*?)$": "<rootDir>/app/routes/$1",
    "^components/(.*?)$": "<rootDir>/app/components/$1",
    "^helpers/(.*?)$": "<rootDir>/app/helpers/$1",
    "^pages/(.*?)$": "<rootDir>/app/pages/$1",
    "^assets/(.*?)$": "<rootDir>/app/assets/$1",
    "^docs/(.*?)$": "<rootDir>/app/docs/$1",
    "^undernet/(.*?)$": "<rootDir>/lib/esm/$1",
  },
  roots: ["<rootDir>/app/", "<rootDir>/js/"],
  setupFiles: ["<rootDir>/test/jest.setup.js"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  testMatch: ["<rootDir>/app/**/*.spec.js", "<rootDir>/js/**/*.spec.js"],
  testURL: "http://localhost/",
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  unmockedModulePathPatterns: ["node_modules/react/", "node_modules/enzyme/"],
  verbose: false,
}
