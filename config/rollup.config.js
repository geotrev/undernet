const path = require("path")
const resolve = require("rollup-plugin-node-resolve")
const babel = require("rollup-plugin-babel")
const pkg = require(path.resolve(__dirname, "../package.json"))
const year = new Date().getFullYear()

module.exports = {
  input: path.resolve("js/src/undernet.js"),
  output: {
    file: path.resolve("dist/undernet.bundle.js"),
    format: "umd",
    name: "undernet",
    sourcemap: true,
    banner: `/*!
  * @license MIT (https://github.com/geotrev/undernet/blob/master/LICENSE)
  * Undernet v${pkg.version} (${pkg.homepage})
  * Copyright 2017-${year} ${pkg.author}
  */`,
  },
  plugins: [
    resolve(),
    babel({
      exclude: "node_modules/**",
      plugins: ["external-helpers"],
    }),
  ],
}
