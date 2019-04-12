#!/usr/bin/env node

const fs = require("fs")
const path = require("path")
const args = require("yargs").argv

// set up for operations

const newUndernetVersion = args.tag

const packageFilePath = path.resolve(__dirname, "../package.json")
const pkg = require(packageFilePath)
const currentUndernetVersion = pkg.version

const undernetScssFilePath = path.resolve(__dirname, "../scss/undernet.scss")
const downloadArticleFilePath = path.resolve(__dirname, "../site/docs/download.md")
const readFormat = "utf-8"

// get update for package.json

function getPackageVersion(version) {
  return `"version": "${version}"`
}

function getNewPackageVersion() {
  const packageVersion = getPackageVersion(currentUndernetVersion)
  const newPackageVersion = getPackageVersion(newUndernetVersion)
  const packageFile = fs.readFileSync(packageFilePath, readFormat)
  return packageFile.replace(packageVersion, newPackageVersion)
}

// get update for scss/undernet.scss

function getScssVersion(version) {
  return `v${version}`
}

function getNewScssVersion() {
  const scssVersion = getScssVersion(currentUndernetVersion)
  const newScssVersion = getScssVersion(newUndernetVersion)
  const undernetScssFile = fs.readFileSync(undernetScssFilePath, readFormat)
  return undernetScssFile.replace(scssVersion, newScssVersion)
}

// get update for site/docs/download.md

function getArticleVersion(version) {
  return `@${version}`
}

function getNewIntroductionArticle() {
  const articleVersion = getArticleVersion(currentUndernetVersion)
  const newArticleVersion = getArticleVersion(newUndernetVersion)
  const downloadArticleFile = fs.readFileSync(downloadArticleFilePath, readFormat)
  const versionRegEx = new RegExp(articleVersion, "g")
  return downloadArticleFile.replace(versionRegEx, newArticleVersion)
}

// write to files

fs.writeFileSync(packageFilePath, getNewPackageVersion(), readFormat)
console.log(`-> package.json version updated to ${newUndernetVersion}!`)

fs.writeFileSync(undernetScssFilePath, getNewScssVersion(), readFormat)
console.log(`-> scss/undernet.scss version updated to ${newUndernetVersion}!`)

fs.writeFileSync(downloadArticleFilePath, getNewIntroductionArticle(), readFormat)
console.log(`-> site/docs/download.md version updated to ${newUndernetVersion}!`)
