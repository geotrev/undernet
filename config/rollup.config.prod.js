const path = require("path")
const common = require("./rollup.config.js")
const merge = require("webpack-merge")
import { uglify } from "rollup-plugin-uglify"

module.exports = merge(common, {
  output: {
    file: path.resolve("dist/undernet.bundle.min.js"),
  },
  plugins: [
    uglify({
      output: {
        comments: function(node, comment) {
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
  ],
})
