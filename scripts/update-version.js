#!/usr/bin/env node

const fs = require("fs")
const path = require("path")
const args = require("yargs").argv

// set up for operations

const newUndernetVersion = args["tag"]
const packageFilePath = path.resolve(__dirname, "../package.json")
const pkg = require(packageFilePath)
const undernetScssFilePath = path.resolve(__dirname, "../scss/undernet.scss")
const readFormat = "utf-8"

// Update existing package version to `newUndernetVersion`

function getPackageVersion(version) {
  return `"version": "${version}"`
}

const packageVersion = getPackageVersion(pkg.version)
const newPackageVersion = getPackageVersion(newUndernetVersion)
const packageFile = fs.readFileSync(packageFilePath, readFormat)
const newPackageFile = packageFile.replace(packageVersion, newPackageVersion)
fs.writeFileSync("package.json", newPackageFile, readFormat)
console.log(`-> package.json version updated to ${newUndernetVersion}!`)

// Update scss/undernet.scss version to `newUndernetVersion`

function getScssVersion(version) {
  return `v${version}`
}

const scssVersion = getScssVersion(pkg.version)
const newScssVersion = getScssVersion(newUndernetVersion)
const undernetScssFile = fs.readFileSync(undernetScssFilePath, readFormat)
const newScssFile = undernetScssFile.replace(scssVersion, newScssVersion)
fs.writeFileSync("scss/undernet.scss", newScssFile, readFormat)
console.log(`-> scss/undernet.scss version updated to ${newUndernetVersion}!`)
