#!/usr/bin/env node

const fs = require("fs")
const path = require("path")

// set up for operations

const packageFilePath = path.resolve(__dirname, "../package.json")
const pkg = require(packageFilePath)
const nextVersion = pkg.version

const undernetScssFilePath = path.resolve(__dirname, "../scss/undernet.scss")
const downloadArticleFilePath = path.resolve(__dirname, "../site/docs/download.md")
const readFormat = "utf-8"
let currentVersion

// get update for scss/undernet.scss

const getScssVersion = version => `v${version}`

function setNewScssVersion() {
  const undernetScssFile = fs.readFileSync(undernetScssFilePath, readFormat)
  currentVersion = undernetScssFile.match(/v\S+/g)[1]
  const currentVersionString = getScssVersion(currentVersion)
  const newVersionString = getScssVersion(nextVersion)
  return undernetScssFile.replace(currentVersionString, newVersionString)
}

// get update for site/docs/download.md

const getArticleVersion = version => `@${version}`

function setNewIntroArticleVersion() {
  const downloadArticleFile = fs.readFileSync(downloadArticleFilePath, readFormat)
  const articleVersion = getArticleVersion(currentVersion)
  const versionRegEx = new RegExp(articleVersion, "g")
  const newVersionString = getArticleVersion(nextVersion)
  return downloadArticleFile.replace(versionRegEx, newVersionString)
}

// write to files

fs.writeFileSync(undernetScssFilePath, setNewScssVersion(), readFormat)
console.log(`-> scss/undernet.scss version updated to ${nextVersion}!`)

fs.writeFileSync(downloadArticleFilePath, setNewIntroArticleVersion(), readFormat)
console.log(`-> site/docs/download.md version updated to ${nextVersion}!`)
