#!/usr/bin/env node

const fs = require("fs")
const path = require("path")

// set up for operations

const readFormat = "utf-8"

const packageFilePath = path.resolve(process.cwd(), "package.json")
const pkg = require(packageFilePath)
const undernetScssFilePath = path.resolve(process.cwd(), "src/scss/undernet.scss")
const jekyllConfigFilePath = path.resolve(process.cwd(), "_config.yml")

const versionRegEx = /[0-9]+\.[0-9]+\.[0-9]+/g
const newVersion = pkg.version

// get update for src/scss/undernet.scss

function getNewScssContent() {
  const undernetScssFile = fs.readFileSync(undernetScssFilePath, readFormat)

  if (versionRegEx.test(undernetScssFile)) {
    return undernetScssFile.replace(versionRegEx, newVersion)
  }

  console.error("Couldn't update src/scss/undernet.scss")
}

// get update for _config.yml

function getNewConfigContent() {
  const jekyllConfigFile = fs.readFileSync(jekyllConfigFilePath, readFormat)

  if (versionRegEx.test(jekyllConfigFile)) {
    return jekyllConfigFile.replace(versionRegEx, newVersion)
  }

  console.error("Couldn't update _config.yml")
}

// write to files

fs.writeFileSync(undernetScssFilePath, getNewScssContent(), readFormat)
console.log(`-> src/scss/undernet.scss version updated to ${newVersion}!`)

fs.writeFileSync(jekyllConfigFilePath, getNewConfigContent(), readFormat)
console.log(`-> _config.yml package.version updated to ${newVersion}!`)
