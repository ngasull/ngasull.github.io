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
  content: ["lib/**/*.tsx", "pages/**/*.tsx"],
  theme: {
    extend: {
      maxHeight: {
        none: "0",
      },
    },
  },
}
