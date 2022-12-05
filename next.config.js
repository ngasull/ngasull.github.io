module.exports = {
  //devIndicators: {
  //  buildActivity: false,
  //},
  poweredByHeader: false,
  i18n: {
    locales: ["en", "fr"],
    defaultLocale: "en",
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.mdx?$/,
      use: "raw-loader",
    })
    return config
  },
}
