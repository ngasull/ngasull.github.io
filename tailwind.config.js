module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
    defaultLineHeights: true,
    standardFontWeights: true,
  },
  purge: ["lib/**/*.tsx", "pages/**/*.tsx"],
  theme: {
    extend: {
      maxHeight: {
        none: "0",
      },
    },
  },
}
