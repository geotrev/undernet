#!/usr/bin/env node

const fs = require("fs")
const path = require("path")

// set up for operations

const packageFilePath = path.resolve(__dirname, "../package.json")
const pkg = require(packageFilePath)

const undernetScssFilePath = path.resolve(__dirname, "../scss/undernet.scss")
const downloadArticleFilePath = path.resolve(__dirname, "../site/docs/download.md")
const readFormat = "utf-8"

const versionRegEx = /[0-9]\.[0-9]\.[0-9]/g

// get update for scss/undernet.scss

function setNewScssVersion() {
  const undernetScssFile = fs.readFileSync(undernetScssFilePath, readFormat)
  return undernetScssFile.replace(versionRegEx, pkg.version)
}

// get update for site/docs/download.md

function setNewDlArticleVersion() {
  const downloadArticleFile = fs.readFileSync(downloadArticleFilePath, readFormat)
  return downloadArticleFile.replace(versionRegEx, pkg.version)
}

// write to files

fs.writeFileSync(undernetScssFilePath, setNewScssVersion(), readFormat)
console.log(`-> scss/undernet.scss version updated to ${pkg.version}!`)

fs.writeFileSync(downloadArticleFilePath, setNewDlArticleVersion(), readFormat)
console.log(`-> site/docs/download.md version updated to ${pkg.version}!`)
