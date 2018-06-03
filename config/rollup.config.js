const path = require("path")
const resolve = require("rollup-plugin-node-resolve")
const babel = require("rollup-plugin-babel")
const pkg = require(path.resolve(__dirname, "../package.json"))
const year = new Date().getFullYear()

module.exports = {
  input: path.resolve("js/src/monolith.js"),
  output: {
    file: path.resolve("dist/monolith.bundle.js"),
    format: "umd",
    name: "getmonolith",
    sourcemap: true,
    banner: `/*!
  * @license MIT (https://github.com/geotrev/getmonolith.io/blob/master/LICENSE)
  * Monolith v${pkg.version} (${pkg.homepage})
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
