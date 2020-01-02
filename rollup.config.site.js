import { terser } from "rollup-plugin-terser"
import path from "path"
import resolve from "rollup-plugin-node-resolve"
import babel from "rollup-plugin-babel"
import glob from "glob"

const scriptFiles = glob.sync("_scripts/**/!(_)*.js")

const inputs = scriptFiles.reduce((files, input) => {
  const parts = input.split("/")
  const fileKey = parts[parts.length - 1]
  return { [fileKey]: path.resolve(__dirname, input), ...files }
}, {})

const outputs = Object.keys(inputs).reduce((files, file) => {
  const inputPath = inputs[file]
  const parts = inputPath.split("/")
  const pathIndex = parts.indexOf("_scripts") + 1
  const outputPath = parts.slice(pathIndex).join("/")
  return { [file]: path.resolve(__dirname, `assets/js/${outputPath}`), ...files }
}, {})

const bundles = Object.keys(inputs).map(key => {
  return {
    input: inputs[key],
    output: {
      file: outputs[key],
      format: "umd",
      sourcemap: true,
    },
    plugins: [
      resolve(),
      babel({
        exclude: "node_modules/**",
        comments: false,
      }),
      terser(),
    ],
  }
})

export default bundles
