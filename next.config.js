module.exports = {
  poweredByHeader: false,
  i18n: {
    locales: ["en", "fr"],
    defaultLocale: "en",
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.adoc?$/,
      use: "raw-loader",
    })
    return config
  },
}
