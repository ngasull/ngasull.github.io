module.exports = {
  target: "serverless",
  devIndicators: {
    autoPrerender: false,
  },
  poweredByHeader: false,
  i18n: {
    locales: ["en", "fr"],
    defaultLocale: "fr",
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.mdx?$/,
      use: "raw-loader",
    })
    return config
  },
}
