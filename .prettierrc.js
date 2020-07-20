module.exports = {
  semi: false,
  printWidth: 100,
  tabWidth: 2,
  arrowParens: "avoid",
  trailingComma: "es5",
  bracketSpacing: true,
  overrides: [
    {
      files: "*.scss",
      options: {
        trailingComma: "none",
      },
    },
  ],
}
