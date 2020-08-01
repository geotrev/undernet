/**
 * @jest-environment node
 */

const path = require("path")
const sassTrue = require("sass-true")
const glob = require("glob")

describe("Scss", () => {
  const sassTestFiles = glob.sync(path.resolve(process.cwd(), "src/**/*.spec.scss"))

  sassTestFiles.forEach(file => sassTrue.runSass({ file }, { describe, it }))
})
