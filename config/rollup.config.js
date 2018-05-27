import resolve from "rollup-plugin-node-resolve"
import babel from "rollup-plugin-babel"

export default {
  input: "framework/js/src/monolith.js",
  output: {
    file: "dist/monolith.bundle.js",
    format: "umd",
    name: "getmonolith",
    sourcemap: true,
  },
  plugins: [
    resolve(),
    babel({
      exclude: "node_modules/**",
      plugins: ["external-helpers"],
    }),
  ],
}
