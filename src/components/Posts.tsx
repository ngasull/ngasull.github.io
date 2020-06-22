import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "~/components/layout"
import SEO from "~/components/seo"

const Posts: React.FC<{
  lang: "fr" | "en"
  title: string
  data: any
  location: any
}> = ({ data, location, title }) => {
  return (
    <Layout lang={location.pathname.match(/^\/fr/) ? "fr" : "en"}>
      <SEO title={title} />
      <h1>{title}</h1>

      {data.allMdx.edges.map(({ node: { fields, frontmatter } }) => (
        <article key={fields.path}>
          <h3>
            <Link to={fields.path}>📖 {frontmatter.title}</Link>
          </h3>
          <div>
            {[
              "Blog",
              fields.date,
              frontmatter.categories.split(" ").join(" • "),
            ]
              .filter(Boolean)
              .join(" » ")}
          </div>
        </article>
      ))}
    </Layout>
  )
}

export const postsFragment = graphql`
  fragment PostsFragment on Query {
    allMdx(
      filter: { fields: { lang: { eq: $lang } } }
      sort: { fields: [fields___date], order: DESC }
    ) {
      edges {
        node {
          fields {
            path
            date(formatString: "YYYY-MM-DD")
          }
          frontmatter {
            title
            categories
          }
        }
      }
    }
  }
`

export default Posts
