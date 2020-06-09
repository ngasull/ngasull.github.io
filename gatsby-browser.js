import { MDXProvider } from "@mdx-js/react"
import { ThemeProvider } from "emotion-theming"
import React from "react"
import { theme } from "~/theme"
import "~/assets/new.min.css"
import "~/assets/global.css"

export function wrapRootElement({ element }) {
  return (
    <ThemeProvider theme={theme}>
      <MDXProvider>{element}</MDXProvider>
    </ThemeProvider>
  )
}
