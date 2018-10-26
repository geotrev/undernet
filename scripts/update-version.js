#!/usr/bin/env node

const fs = require("fs")
const path = require("path")
const args = require("yargs").argv

// set up for operations

const newUndernetVersion = args["tag"]
const packageFilePath = path.resolve(__dirname, "../package.json")
const pkg = require(packageFilePath)
const undernetScssFilePath = path.resolve(__dirname, "../scss/undernet.scss")
const introArticleFilePath = path.resolve(__dirname, "../docs/introduction.md")
const readFormat = "utf-8"

// get update for package.json

function getPackageVersion(version) {
  return `"version": "${version}"`
}

function getNewPackageVersion() {
  const packageVersion = getPackageVersion(pkg.version)
  const newPackageVersion = getPackageVersion(newUndernetVersion)
  const packageFile = fs.readFileSync(packageFilePath, readFormat)
  return packageFile.replace(packageVersion, newPackageVersion)
}

// get update for scss/undernet.scss

function getScssVersion(version) {
  return `v${version}`
}

function getNewScssVersion() {
  const scssVersion = getScssVersion(pkg.version)
  const newScssVersion = getScssVersion(newUndernetVersion)
  const undernetScssFile = fs.readFileSync(undernetScssFilePath, readFormat)
  return undernetScssFile.replace(scssVersion, newScssVersion)
}

// get update for docs/introduction.md

function getArticleVersion(version) {
  return `@${version}`
}

function getNewIntroductionArticle() {
  const articleVersion = getArticleVersion(pkg.version)
  const newArticleVersion = getArticleVersion(newUndernetVersion)
  const introArticleFile = fs.readFileSync(introArticleFilePath, readFormat)
  const versionRegEx = new RegExp(articleVersion, "g")
  return introArticleFile.replace(versionRegEx, newArticleVersion)
}

// write to files

fs.writeFileSync("package.json", getNewPackageVersion(), readFormat)
console.log(`-> package.json version updated to ${newUndernetVersion}!`)

fs.writeFileSync("scss/undernet.scss", getNewScssVersion(), readFormat)
console.log(`-> scss/undernet.scss version updated to ${newUndernetVersion}!`)

fs.writeFileSync("docs/introduction.md", getNewIntroductionArticle(), readFormat)
console.log(`-> docs/introduction.md version updated to ${newUndernetVersion}!`)
