#!/usr/bin/env node

const fs = require("fs")
const path = require("path")
const Hashes = require("jshashes")

// set up for operations

const distJsFilePath = path.resolve(__dirname, "../dist/undernet.bundle.min.js")
const distCssFilePath = path.resolve(__dirname, "../dist/undernet.min.css")
const introArticleFilePath = path.resolve(__dirname, "../docs/introduction.md")
const readFormat = "utf-8"

// update hashes in docs/introduction.md

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
  return introArticleFile.replace(currentJsHash, newJsHash).replace(currentCssHash, newCssHash)
}

fs.writeFileSync("docs/introduction.md", getNewIntroductionArticle(), readFormat)
console.log(`
#========================================#

-> New content hashes created! They're used in docs/introduction.md.
   - CSS: ${newCssHash.slice(1, -1)}
   - JS: ${newJsHash.slice(1, -1)}
`)
