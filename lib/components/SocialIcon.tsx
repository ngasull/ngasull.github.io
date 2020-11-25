import React from "react"

export default function SocialIcon({
  icon,
}: {
  icon: string
}): React.ReactElement {
  return (
    <svg className="w-4 h-4 p-2 -m-2 align-text-top fill-current">
      <use xlinkHref={`/svg/icons.svg#${icon}`} />
    </svg>
  )
}
