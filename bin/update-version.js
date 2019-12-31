#!/usr/bin/env node

const fs = require("fs")
const path = require("path")

// set up for operations

const packageFilePath = path.resolve(__dirname, "../package.json")
const pkg = require(packageFilePath)
const downloadFilePath = "/docs/overview/download.md"

const undernetScssFilePath = path.resolve(__dirname, "../src/scss/undernet.scss")
const downloadArticleFilePath = path.resolve(__dirname, `..${downloadFilePath}`)
const readFormat = "utf-8"

const versionRegEx = /undernet@[0-9]+\.[0-9]+\.[0-9]+/g
const newVersion = `undernet@${pkg.version}`

// get update for src/scss/undernet.scss

function setNewScssVersion() {
  const undernetScssFile = fs.readFileSync(undernetScssFilePath, readFormat)
  return undernetScssFile.replace(versionRegEx, newVersion)
}

// get update for app/docs/download.md

function setNewDlArticleVersion() {
  const downloadArticleFile = fs.readFileSync(downloadArticleFilePath, readFormat)
  return downloadArticleFile.replace(versionRegEx, newVersion)
}

// write to files

fs.writeFileSync(undernetScssFilePath, setNewScssVersion(), readFormat)
console.log(`-> src/scss/undernet.scss version updated to ${newVersion}!`)

fs.writeFileSync(downloadArticleFilePath, setNewDlArticleVersion(), readFormat)
console.log(`-> ${downloadFilePath} version updated to ${newVersion}!`)
