import { graphql, useStaticQuery } from "gatsby"
import React from "react"

import Posts from "~/components/Posts"

const IndexPage: React.FC = ({ location }) => {
  const data = useStaticQuery(graphql`
    query PostsFrQuery($lang: String! = "fr") {
      ...PostsFragment
    }
  `)
  return <Posts data={data} location={location} lang="fr" title="Articles" />
}

export default IndexPage
