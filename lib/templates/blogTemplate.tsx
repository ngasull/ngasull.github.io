/** @jsx jsx */

import { graphql } from "gatsby"
import React from "react"
import Layout from "~/components/layout"
import { css, jsx } from "~/theme"

export default function Template({ data }): React.ReactElement {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  const lang = location.pathname.match(/^\/fr/) ? "fr" : "en"
  return (
    <Layout lang={lang}>
      <h1>{frontmatter.title}</h1>
      <h6
        css={css`
          margin-bottom: 2rem;
        `}
      >
        {frontmatter.date}
      </h6>
      <div
        className="blog-post-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </Layout>
  )
}

//export const pageQuery = graphql`
//  query($path: String!) {
//    markdownRemark(frontmatter: { path: { eq: $path } }) {
//      html
//      frontmatter {
//        date(formatString: "DD.MM.YYYY")
//        path
//        title
//      }
//    }
//  }
//`
