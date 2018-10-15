const fs = require("fs")
const path = require("path")
const args = require("yargs").argv
const newUndernetVersion = args["tag"]

// Grabs existing package.json version and updates it to newUndernetVersion
const currentPackageFile = path.resolve(__dirname, "../package.json")
const currentPackage = require(path.resolve(__dirname, "../package.json"))
const packageVersion = `"version": "${currentPackage.version}"`
const newPackageVersion = `"version": "${newUndernetVersion}"`
const packageFile = fs.readFileSync(currentPackageFile, "utf-8")
const newPackageFile = packageFile.replace(packageVersion, newPackageVersion)
fs.writeFileSync("package.json", newPackageFile, "utf-8")
