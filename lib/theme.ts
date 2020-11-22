import { css } from "@emotion/core"
import { SerializedStyles } from "@emotion/utils"

export { css, jsx } from "@emotion/core"
export { default as styled } from "@emotion/styled"

const colors = {
  initial: "#373a4b",
  //primary: "#bd93f9",
  //secondary: "#f8f8f2",
  tertiary: "#282a36",
  quaternary: "#faf7a2",
  quinary: "#6272a4",
  tone: "#fff",
  primary: {
    lighter: "",
    light: "",
    base: "",
    dark: "",
    darker: "",
    text: "",
  },
  secondary: {
    lighter: "",
    light: "",
    base: "",
    dark: "",
    darker: "",
    text: "",
  },
  overlay: "rgba(33,43,54,.4)",
  sky: {
    lighter: "#F9FAFB",
    light: "#F4F6F8",
    base: "#DFE3E8",
    dark: "#C4CDD5",
  },
  ink: {
    lightest: "#919EAB",
    lighter: "#637381",
    light: "#454F5B",
    base: "#212B36",
  },
  purple: {
    lighter: "#F6F0FD",
    light: "#E3D0FF",
    base: "#9C6ADE",
    dark: "#50248F",
    darker: "#230051",
    text: "#50495A",
  },
  indigo: {
    lighter: "#F4F5FA",
    light: "#B3BCF5",
    base: "#5C6AC4",
    dark: "#202E78",
    darker: "#000639",
    text: "#3E4155",
  },
  yellow: {
    lighter: "#FCF1CD",
    light: "#FFEA8A",
    base: "#EEC200",
    dark: "#8A6116",
    darker: "#573B00",
    text: "#595130",
  },
  green: {
    lighter: "#E3F1DF",
    light: "#BBE5B3",
    base: "#50B83C",
    dark: "#108043",
    darker: "#173630",
    text: "#414F3E",
  },
  red: {
    lighter: "#FBEAE5",
    light: "#FEAD9A",
    base: "#DE3618",
    dark: "#BF0711",
    darker: "#330101",
    text: "#583C35",
  },
}
colors.primary = colors.indigo
colors.secondary = colors.purple

const breakpoints: number[] & {
  mobile: number
  small: number
} = asRecordArray({ mobile: 768, small: 1024 })
const fonts = {
  heading: "inherit",
}

const fontSizes = asRecordArray({
  s: "1.2rem",
  base: "1.4rem",
  m: "1.6rem",
  // Display sizes
  ds: "2rem",
  dm: "2.6rem",
  dl: "2.8rem",
  dxl: "4.2rem",
})

const fontWeights = {
  thin: 200,
  light: 300,
  regular: 400,
  medium: 500,
  bold: 700,
  black: 900,
}

const shadows = {
  card:
    "rgba(63,63,68,.05) 0px 0px 0px 1px, rgba(63,63,68,.15) 0px 1px 3px 0px",
  high: "0 1.2rem 3.6rem rgba(0,0,0,.2)",
}

const lineHeights = ["1.6rem", "2rem", "2.4rem", "3.2rem", "4.4rem"]

const space = asRecordArray({
  none: 0,
  extraTight: ".4rem",
  tight: ".8rem",
  baseTight: "1.2rem",
  base: "1.6rem",
  loose: "2rem",
  extraLoose: "3.2rem",
})

const text = {
  caption: css`
    font-size: ${fontSizes.s};
    line-height: ${lineHeights[0]};
    font-weight: ${fontWeights.regular};
  `,
  body: css`
    font-size: ${fontSizes.base};
    line-height: ${lineHeights[1]};
    font-weight: ${fontWeights.regular};
  `,
  subheading: css`
    font-size: ${fontSizes.s};
    line-height: ${lineHeights[0]};
    font-weight: ${fontWeights.bold};
    text-transform: uppercase;
  `,
  heading: css`
    font-size: ${fontSizes.m};
    line-height: ${lineHeights[1]};
    font-weight: ${fontWeights.medium};
  `,
  ds: css`
    font-size: ${fontSizes.ds};
    line-height: ${lineHeights[2]};
    font-weight: ${fontWeights.regular};
  `,
  dm: css`
    font-size: ${fontSizes.dm};
    line-height: ${lineHeights[3]};
    font-weight: ${fontWeights.regular};
  `,
  dl: css`
    font-size: ${fontSizes.dl};
    line-height: ${lineHeights[3]};
    font-weight: ${fontWeights.medium};
  `,
  dxl: css`
    font-size: ${fontSizes.dxl};
    line-height: ${lineHeights[4]};
    font-weight: ${fontWeights.medium};
  `,
}

const linkActive = css`
  color: ${colors.primary.dark};
`

const link = css`
  color: ${colors.primary.base};
  text-decoration: none;

  &:hover {
    ${linkActive}
  }
`

export const theme = {
  breakpoints,
  fonts,
  fontSizes,
  fontWeights,
  shadows,
  lineHeights,
  link,
  linkActive,
  space,
  colors,
  text,
  global: css`
    html {
      font-size: 62.5%;
    }
    body {
      ${text.body};
      font-family: system-ui, Ubuntu, Oxygen, Cantarell, Roboto, -apple-system,
        "Segoe UI", Arial, sans-serif;
      color: ${colors.ink.base};
      background-color: ${colors.sky.lighter};
    }
  `,
  variants: {
    card: {
      base: {
        bg: "tone",
        boxShadow: "card",
        border: `1px solid ${colors.sky.dark}`,
      },
    },
    flex: {
      distribution: {
        equalSpacing: {
          justifyContent: "space-between",
        },
        leading: {
          justifyContent: "flex-start",
        },
        center: {
          justifyContent: "center",
        },
        trailing: {
          justifyContent: "flex-start",
        },
      },
    },
    visuallyHidden: css`
      /// Used to hide an element visually, but keeping it accessible for
      position: absolute !important;
      top: 0;
      clip: rect(1px, 1px, 1px, 1px) !important;
      overflow: hidden !important;
      height: 1px !important;
      width: 1px !important;
      padding: 0 !important;
      border: 0 !important;
    `,
  },
}

export function responsive(styles: SerializedStyles[]): SerializedStyles[] {
  return styles.map((style, b) =>
    b === 0
      ? style
      : css`
          @media (min-width: ${breakpoints[b - 1]}) {
            ${style}
          }
        `
  )
}

export function cssplus(
  strings: TemplateStringsArray,
  ...args: unknown[]
): SerializedStyles {
  const extraStyles: [string[], unknown[]][] = []
  const baseStrings: string[] & { raw: string[] } = Object.assign(
    strings.slice(),
    {
      raw: strings.raw.slice(),
    }
  )
  const baseArgs = args.map((a, i) => {
    const cssProp = Array.isArray(a) && strings[i].match(/[\w-]+\s*:\s*$/)
    if (cssProp && Array.isArray(a)) {
      for (let b = 1; b < a.length; b++) {
        if (extraStyles.length < b + 1) {
          extraStyles[b] = [[], []]
        }
        extraStyles[b][0].push(cssProp[0])
        extraStyles[b][1].push(a[b])
      }
      return a[0]
    } else {
      return a
    }
  })

  extraStyles.forEach(([extraStrings, extraArgs], b) => {
    baseStrings[
      baseStrings.length - 1
    ] += `@media (min-width: ${breakpoints[b]}) {`
    extraArgs.forEach(extraArg => {
      baseStrings[baseStrings.length - 1] += extraStrings[0]
      baseStrings.raw[baseStrings.length - 1] =
        baseStrings[baseStrings.length - 1]
      baseArgs.push(extraArg)
      baseStrings.push(";")
    })
    baseStrings[baseStrings.length - 1] += "}"
    baseStrings.raw[baseStrings.length - 1] =
      baseStrings[baseStrings.length - 1]
  })

  return css(baseStrings, ...baseArgs)
}

function asRecordArray<K extends string, V, O extends Record<K, V>>(
  obj: O
): V[] & O {
  return Object.assign(Object.values(obj) as V[], obj)
}
