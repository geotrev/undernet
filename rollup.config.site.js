import glob from "glob"
import path from "path"
import { terser } from "rollup-plugin-terser"
import resolve from "@rollup/plugin-node-resolve"
import babel from "rollup-plugin-babel"
import commonjs from "@rollup/plugin-commonjs"
import alias from "@rollup/plugin-alias"

const absolutePath = dirPath => path.resolve(__dirname, dirPath)
const scriptFiles = glob.sync(absolutePath("site/_scripts/**/!(_)*.js"))
const scriptsTarget = "site/assets/js/"
const isProd = process.env.BABEL_ENV === "production"

const inputs = scriptFiles.reduce((files, input) => {
  const parts = input.split("/")
  const fileKey = parts[parts.length - 1]
  return { [fileKey]: absolutePath(input), ...files }
}, {})

const outputs = Object.keys(inputs).reduce((files, file) => {
  const inputPath = inputs[file]
  const parts = inputPath.split("/")
  const pathIndex = parts.indexOf("_scripts") + 1
  const outputPath = parts.slice(pathIndex).join("/")
  return { [file]: absolutePath(scriptsTarget + outputPath), ...files }
}, {})

const plugins = [
  resolve(),
  commonjs(),
  babel({
    exclude: "node_modules/**",
    comments: false,
  }),
  alias({
    entries: [{ find: "undernet", replacement: "../../src/js" }],
  }),
]

if (isProd) plugins.push(terser())

const bundles = Object.keys(inputs).map(key => {
  return {
    input: inputs[key],
    output: {
      file: outputs[key],
      format: "iife",
      sourcemap: isProd ? false : true,
    },
    plugins,
  }
})

export default bundles
