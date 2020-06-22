import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "~/components/layout"
import SEO from "~/components/seo"

const IndexPage: React.FC = ({ data }) => {
  return (
    <Layout>
      <SEO title="Home" />
      <h1>Posts</h1>

      {data.allMdx.edges.map(({ node: { fields, frontmatter } }) => (
        <article key={fields.path}>
          <h3>
            <Link to={fields.path}>📖 {frontmatter.title}</Link>
          </h3>
          <div>
            Blog » {fields.date} »{" "}
            {frontmatter.categories.split(" ").join(" • ")}
          </div>
        </article>
      ))}
    </Layout>
  )
}

export const query = graphql`
  query AllPosts {
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
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

export default IndexPage
