module.exports = {
  poweredByHeader: false,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.adoc?$/,
      use: "raw-loader",
    })
    return config
  },
}
