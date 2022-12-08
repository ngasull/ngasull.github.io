import Link from "next/link"
import { ComponentPropsWithoutRef } from "react"
import { useLocale } from "./useLocale"

export const LocaLink: React.FC<ComponentPropsWithoutRef<typeof Link>> = ({
  locale,
  href,
  ...props
}) => {
  const currentLocale = useLocale()
  locale = locale === undefined ? currentLocale : locale === "en" ? null : "fr"
  return <Link href={(locale ? `/${locale}` : "") + href} {...props} />
}
