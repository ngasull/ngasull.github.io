import React from "react"
import SEO from "~/components/seo"

const IndexPage: React.FC = () => {
  //const lang = navigator.language.includes("fr") ? "fr" : "en"
  const rootUri = `/fr/`
  return (
    <SEO title="Redirect to new route">
      <meta httpEquiv="refresh" content={`0;url=${rootUri}`} />
      <link rel="canonical" href={rootUri} />
    </SEO>
  )
}

export default IndexPage
