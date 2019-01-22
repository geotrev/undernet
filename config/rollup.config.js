import { uglify } from "rollup-plugin-uglify"
import pkg from "../package.json"
import path from "path"
import resolve from "rollup-plugin-node-resolve"
import babel from "rollup-plugin-babel"
import banner from "./banner"

const inputs = {
  umd: path.resolve(__dirname, "../js/src/index.bundle.js"),
  esm: path.resolve(__dirname, `../js/src/index.js`),
}

const outputs = {
  umd: path.resolve(__dirname, "../dist/undernet.bundle.js"),
  umdMin: path.resolve(__dirname, `../${pkg.browser}`),
  esm: path.resolve(__dirname, `../${pkg.module}`),
}

const umdOutput = {
  file: outputs.umd,
  format: "umd",
  name: pkg.name,
  sourcemap: true,
  exports: "named",
  banner,
}

const plugins = [
  resolve(),
  babel({
    exclude: "node_modules/**",
    comments: false,
  }),
]

const umdMinOutput = Object.assign({}, umdOutput, {
  file: outputs.umdMin,
})

const umdMinPlugins = []
umdMinPlugins.push(
  ...plugins,
  uglify({
    output: {
      comments: (node, comment) => {
        if (comment.type === "comment2") {
          return /@preserve|@license|@cc_on/i.test(comment.value)
        }
        return false
      },
    },
    mangle: { reserved: ["Undernet"] },
  }),
)

const esmOutput = { file: outputs.esm, format: "esm", banner }

const umdBundle = {
  input: inputs.umd,
  output: umdOutput,
  plugins,
}

const umdMinBundle = {
  input: inputs.umd,
  output: umdMinOutput,
  plugins: umdMinPlugins,
}

const esmConfig = {
  input: inputs.esm,
  output: esmOutput,
  plugins: [],
}

module.exports = [umdBundle, umdMinBundle, esmConfig]
