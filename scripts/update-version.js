#!/usr/bin/env node

const Hashes = require("jshashes")
const fs = require("fs")
const path = require("path")
const args = require("yargs").argv

// set up for operations

const newUndernetVersion = args["tag"]
const packageFilePath = path.resolve(__dirname, "../package.json")
const pkg = require(packageFilePath)
const undernetScssFilePath = path.resolve(__dirname, "../scss/undernet.scss")
const distJsFilePath = path.resolve(__dirname, "../dist/undernet.bundle.min.js")
const distCssFilePath = path.resolve(__dirname, "../dist/undernet.min.css")
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

const introArticleFile = fs.readFileSync(introArticleFilePath, readFormat)

function createNewHash(str) {
  return new Hashes.SHA256().b64(str)
}

// regex pattern to detect base 64 encoded string.
// https://stackoverflow.com/a/31245864
const reb64 = /\"sha256-([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}|[A-Za-z0-9+/]{2})=\"/g

// retrieve existing hashes
const b64Strings = introArticleFile.match(reb64)

// apply new hashes and return new introduction.md
const distCssFile = fs.readFileSync(distCssFilePath, readFormat)
const distJsFile = fs.readFileSync(distJsFilePath, readFormat)
const newCssHash = `"sha256-${createNewHash(distCssFile)}"`
const newJsHash = `"sha256-${createNewHash(distJsFile)}"`

// get new hashes and inject them into docs/introduction.md
function getNewIntroductionArticle() {
  const currentCssHash = b64Strings[0]
  const currentJsHash = b64Strings[1]
  const versionRegEx = new RegExp(pkg.version, "g")
  return introArticleFile
    .replace(currentJsHash, newJsHash)
    .replace(currentCssHash, newCssHash)
    .replace(versionRegEx, newUndernetVersion)
}

// write to files

fs.writeFileSync("package.json", getNewPackageVersion(), readFormat)
console.log(`-> package.json version updated to ${newUndernetVersion}!`)

fs.writeFileSync("scss/undernet.scss", getNewScssVersion(), readFormat)
console.log(`-> scss/undernet.scss version updated to ${newUndernetVersion}!`)

fs.writeFileSync("docs/introduction.md", getNewIntroductionArticle(), readFormat)
console.log(`-> docs/introduction.md example hashes updated!
   - CSS: ${newCssHash.slice(1, -1)}
   - JS: ${newJsHash.slice(1, -1)}
`)
