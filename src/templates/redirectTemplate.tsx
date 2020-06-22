import { graphql } from "gatsby"
import React from "react"
import SEO from "~/components/seo"

const Redirect: React.FC<{
  data: { mdx: { fields: { path: string } } }
}> = props => {
  return (
    <SEO title="Redirect to new route">
      <meta
        httpEquiv="refresh"
        content={`0;url=${props.data.mdx.fields.path}`}
      />
      <link rel="canonical" href={props.data.mdx.fields.path} />
    </SEO>
  )
}

export const query = graphql`
  query RedirectQuery($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      fields {
        path
      }
      frontmatter {
        title
      }
      body
      excerpt
      tableOfContents
      timeToRead
    }
  }
`

export default Redirect
