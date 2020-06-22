import { graphql } from "gatsby"
import React, { useEffect } from "react"

const Redirect: React.FC<{
  data: { mdx: { fields: { path: string } } }
}> = props => {
  useEffect(() => {
    document.location.replace(props.data.mdx.fields.path)
  }, [])
  return null
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
