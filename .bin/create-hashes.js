#!/usr/bin/env node

const fs = require("fs")
const path = require("path")
const Hashes = require("jshashes")

// set up for operations

const distJsFilePath = path.resolve(process.cwd(), "dist/undernet.bundle.min.js")
const distCssFilePath = path.resolve(process.cwd(), "dist/undernet.min.css")
const jekyllConfigFilePath = path.resolve(process.cwd(), "_config.yml")
const readFormat = "utf-8"

// update hashes in docs/download.md

const jekyllConfigFile = fs.readFileSync(jekyllConfigFilePath, readFormat)

function getNewB64Hash(str) {
  return new Hashes.SHA256().b64(str)
}

// regex pattern to detect base 64 encoded string.
// https://stackoverflow.com/a/31245864
const reb64 = /sha256-([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}|[A-Za-z0-9+/]{2})=/g

// retrieve existing hashes
const b64Strings = jekyllConfigFile.match(reb64)

if (b64Strings[0] && b64Strings[1]) {
  console.log(`
#========================================#

-> Detected content hashes in _config.yml:
    - CSS (current): ${b64Strings[0]}
    - JS (current): ${b64Strings[1]}
`)
} else {
  console.log("Couldn't detect base 64 hashes in _config.yml; Exiting.")
  return
}

// apply new hashes and return new download.md
const distCssFile = fs.readFileSync(distCssFilePath, readFormat)
const distJsFile = fs.readFileSync(distJsFilePath, readFormat)
const newCssHash = `sha256-${getNewB64Hash(distCssFile)}`
const newJsHash = `sha256-${getNewB64Hash(distJsFile)}`

// get new hashes and inject them into docs/overview/download/index.md
function getNewConfigContent() {
  const currentCssHash = b64Strings[0]
  const currentJsHash = b64Strings[1]
  return jekyllConfigFile.replace(currentJsHash, newJsHash).replace(currentCssHash, newCssHash)
}

fs.writeFileSync(jekyllConfigFilePath, getNewConfigContent(), readFormat)
console.log(`
#========================================#

-> Content hashes created and added to _config.yml
    - CSS (new): ${newCssHash}
    - JS (new): ${newJsHash}
`)
