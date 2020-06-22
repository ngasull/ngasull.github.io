/** @jsx jsx */

import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import React from "react"
import Layout from "~/components/layout"
import SEO from "~/components/seo"
import { css, jsx } from "~/theme"

export default function Template({ data, location }): React.ReactNode {
  const { body, fields, frontmatter, tableOfContents } = data.mdx
  return (
    <Layout lang={location.pathname.match(/^\/fr/) ? "fr" : "en"}>
      <SEO title={frontmatter.title} />
      <article itemType="http://schema.org/BlogPosting">
        <h1>{frontmatter.title}</h1>
        <h6
          css={css`
            margin-bottom: 2rem;
          `}
        >
          {fields.date}
        </h6>

        <div itemProp="articleBody">
          <MDXRenderer
            toc={
              <details open>
                <summary>Table of contents</summary>
                <ul>
                  {tableOfContents.items.map(({ url, title, items }) => (
                    <li key={url}>
                      <a href={url} key={url}>
                        {title}
                      </a>

                      {items && items.length > 0 && (
                        <ul>
                          {items.map(({ url, title }) => (
                            <li key={url}>
                              <a href={url} key={url}>
                                {title}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </details>
            }
          >
            {body}
          </MDXRenderer>
        </div>
      </article>
    </Layout>
  )
}

export const query = graphql`
  query PostBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      fields {
        date(formatString: "MMMM DD, YYYY")
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
