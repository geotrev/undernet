#!/usr/bin/env node

const fs = require("fs")
const path = require("path")
const args = require("yargs").argv

// set up for operations

const newUndernetVersion = args["tag"]
const packageFilePath = path.resolve(__dirname, "../package.json")
const pkg = require(packageFilePath)
const readFormat = "utf-8"

// Update existing package version to `newUndernetVersion`

function getVersion(version) {
  return `"version": "${version}"`
}

const packageVersion = getVersion(pkg.version)
const newPackageVersion = getVersion(newUndernetVersion)
const packageFile = fs.readFileSync(packageFilePath, readFormat)
const newPackageFile = packageFile.replace(packageVersion, newPackageVersion)
fs.writeFileSync("package.json", newPackageFile, readFormat)
