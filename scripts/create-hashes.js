#!/usr/bin/env node

const fs = require("fs")
const path = require("path")
const Hashes = require("jshashes")

// set up for operations

const distJsFilePath = path.resolve(__dirname, "../dist/undernet.bundle.min.js")
const distCssFilePath = path.resolve(__dirname, "../dist/undernet.min.css")
const downloadArticleFilePath = path.resolve(__dirname, "../site/docs/download.md")
const readFormat = "utf-8"

// update hashes in docs/download.md

const downloadArticleFile = fs.readFileSync(downloadArticleFilePath, readFormat)

function createNewHash(str) {
  return new Hashes.SHA256().b64(str)
}

// regex pattern to detect base 64 encoded string.
// https://stackoverflow.com/a/31245864
const reb64 = /"sha256-([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}|[A-Za-z0-9+/]{2})="/g

// retrieve existing hashes
const b64Strings = downloadArticleFile.match(reb64)

// apply new hashes and return new download.md
const distCssFile = fs.readFileSync(distCssFilePath, readFormat)
const distJsFile = fs.readFileSync(distJsFilePath, readFormat)
const newCssHash = `"sha256-${createNewHash(distCssFile)}"`
const newJsHash = `"sha256-${createNewHash(distJsFile)}"`

// get new hashes and inject them into docs/download.md
function getNewIntroductionArticle() {
  const currentCssHash = b64Strings[0]
  const currentJsHash = b64Strings[1]
  return downloadArticleFile.replace(currentJsHash, newJsHash).replace(currentCssHash, newCssHash)
}

fs.writeFileSync("site/docs/download.md", getNewIntroductionArticle(), readFormat)
console.log(`
#========================================#

-> New content hashes created! They're used in site/docs/download.md.
   - CSS: ${newCssHash}
   - JS: ${newJsHash}
`)
