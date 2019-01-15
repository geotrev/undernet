import { uglify } from "rollup-plugin-uglify"
import pkg from "../package.json"
import path from "path"
import resolve from "rollup-plugin-node-resolve"
import babel from "rollup-plugin-babel"
import banner from "./banner"

const input = path.resolve(__dirname, `../js/src/index.bundle.js`)

const umdOutput = {
  file: path.resolve(__dirname, "../dist/undernet.bundle.js"),
  format: "umd",
  name: "undernet",
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
  file: path.resolve(__dirname, `../${pkg.browser}`),
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
    mangle: {
      reserved: ["Undernet"],
    },
  }),
)

const umdBundle = {
  input,
  output: umdOutput,
  plugins,
}

const umdMinBundle = {
  input,
  output: umdMinOutput,
  plugins: umdMinPlugins,
}

module.exports = [umdBundle, umdMinBundle]
