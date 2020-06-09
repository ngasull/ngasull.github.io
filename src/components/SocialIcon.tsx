/** @jsx jsx */

import React from "react"

import socialIconsUrl from "~/images/SocialIcons.svg"
import { css, jsx, theme } from "~/theme"

export default function SocialIcon({
  icon,
}: {
  icon: string
}): React.ReactElement {
  return (
    <svg
      css={css`
        width: 1rem;
        height: 1rem;
        vertical-align: text-top;
        padding: ${theme.space.extraTight};
        margin: -${theme.space.extraTight} ${theme.space.extraTight};
        fill: currentColor;
      `}
    >
      <use xlinkHref={`${socialIconsUrl}#${icon}`} />
    </svg>
  )
}
