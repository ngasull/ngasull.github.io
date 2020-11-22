import React from "react"

export default function SocialIcon({
  icon,
}: {
  icon: string
}): React.ReactElement {
  return (
    <svg className="w-8 h-8 p-2 -m-2 align-text-top fill-current">
      <use xlinkHref={`/svg/SocialIcon.svg#${icon}`} />
    </svg>
  )
}
