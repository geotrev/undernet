const path = require("path")
const common = require("./rollup.config.js")
const merge = require("webpack-merge")
import { uglify } from "rollup-plugin-uglify"

module.exports = merge(common, {
  output: {
    file: path.resolve("dist/monolith.bundle.min.js"),
  },
  plugins: [
    uglify({
      output: {
        comments: (node, comment) => {
          var text = comment.value
          var type = comment.type
          if (type == "comment2") {
            return /@preserve|@license|@cc_on/i.test(text)
          }
        },
      },
      mangle: {
        reserved: ["Monolith", "start", "stop", "accordions", "modals"],
      },
    }),
  ],
})
