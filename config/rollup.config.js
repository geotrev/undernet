const path = require("path")
const resolve = require("rollup-plugin-node-resolve")
const babel = require("rollup-plugin-babel")
const banner = require("./banner.js")

module.exports = {
  input: path.resolve(__dirname, "../js/src/index.bundle.js"),
  output: {
    file: path.resolve(__dirname, "../dist/undernet.bundle.js"),
    format: "umd",
    name: "undernet",
    sourcemap: true,
    banner: banner,
    exports: "named",
  },
  plugins: [
    resolve(),
    babel({
      exclude: "node_modules/**",
      comments: false,
    }),
  ],
}
