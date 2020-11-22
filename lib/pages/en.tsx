import { graphql, useStaticQuery } from "gatsby"
import React from "react"

import Posts from "~/components/Posts"

const IndexPage: React.FC = ({ location }) => {
  const data = useStaticQuery(graphql`
    query PostsEnQuery($lang: String! = "en") {
      ...PostsFragment
    }
  `)
  return <Posts data={data} location={location} lang="en" title="Posts" />
}

export default IndexPage
