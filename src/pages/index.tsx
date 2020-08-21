import React, { useEffect } from "react"
import SEO from "~/components/seo"
import { navigate } from "gatsby"

const IndexPage: React.FC = () => {
  useEffect(() => {
    const lang = navigator.language.includes("fr") ? "fr" : "en"
    navigate(`/${lang}/`, { replace: true })
  })
  return <SEO title="Le labo de Nico" />
}

export default IndexPage
