const withMDX = require("@next/mdx")()

module.exports = withMDX({
  devIndicators: {
    autoPrerender: false,
  },
  poweredByHeader: false,
})
