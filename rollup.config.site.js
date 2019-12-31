import { terser } from "rollup-plugin-terser"
import path from "path"
import resolve from "rollup-plugin-node-resolve"
import babel from "rollup-plugin-babel"

const inputs = {
  sideNav: path.resolve(__dirname, "_scripts/side-navigation.js"),
  undernet: path.resolve(__dirname, "_scripts/undernet.js"),
}

const outputs = {
  sideNav: path.resolve(__dirname, "assets/js/side-navigation.js"),
  undernet: path.resolve(__dirname, "assets/js/undernet.js"),
}

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
