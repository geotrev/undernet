import { terser } from "rollup-plugin-terser"
import path from "path"
import resolve from "rollup-plugin-node-resolve"
import babel from "rollup-plugin-babel"

const banner = require("./bin/banner")
const pkg = require("./package.json")

// Base configurations for all bundles

const inputs = {
  umd: path.join(__dirname, "src/js/index.bundle.js"),
}

const outputs = {
  umd: path.join(__dirname, "dist/undernet.bundle.js"),
  umdMin: path.join(__dirname, "dist/undernet.bundle.min.js"),
}

const plugins = [
  resolve(),
  babel({
    exclude: "node_modules/**",
    comments: false,
  }),
]

/**
 * UMD bundle
 **/

const umdOutput = {
  file: outputs.umd,
  format: "umd",
  name: pkg.name,
  sourcemap: true,
  exports: "named",
  banner,
}

const umdBundle = {
  input: inputs.umd,
  output: umdOutput,
  plugins,
}

/**
 * UMD bundle (minified)
 **/

const umdMinOutput = Object.assign({}, umdOutput, {
  file: outputs.umdMin,
})

const umdMinPlugins = []
umdMinPlugins.push(
  ...plugins,
  terser({
    output: {
      comments: (_, comment) => {
        const { value, type } = comment

        if (type === "comment2") {
          return /@preserve|@license|@cc_on/i.test(value)
        }
      },
    },
    mangle: { reserved: ["Undernet"] },
  })
)

const umdMinBundle = {
  input: inputs.umd,
  output: umdMinOutput,
  plugins: umdMinPlugins,
}

export default [umdBundle, umdMinBundle]
