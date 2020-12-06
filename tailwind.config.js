module.exports = {
  corePlugins: {
    preflight: false,
  },
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
    defaultLineHeights: true,
    standardFontWeights: true,
  },
  purge: {
    content: ["lib/**/*.tsx", "pages/**/*.tsx"],
    options: {
      safelist: ["anchor"],
    },
  },
  theme: {
    extend: {
      maxHeight: {
        none: "0",
      },
    },
  },
}
