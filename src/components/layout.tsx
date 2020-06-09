/** @jsx jsx */
/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import { Link, useStaticQuery, graphql } from "gatsby"
import React, { Fragment } from "react"

import SocialIcon from "~/components/SocialIcon"
import { css, jsx } from "~/theme"

export default function Layout({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <Fragment>
      <Header siteTitle={data.site.siteMetadata.title} />
      <main aria-label="Content">{children}</main>
      <Footer />
    </Fragment>
  )
}

function Header({ siteTitle }: { siteTitle: string }): React.ReactElement {
  return (
    <header>
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
        `}
      >
        <h1>{siteTitle}</h1>
        <h3>{"🔭🎶🕺"}</h3>
      </div>
      <nav>
        <Link to="/">Blog</Link>
        {" / "}
        <Link to="/about">About</Link>
        {" / "}
        <a href="/rss.xml">RSS</a>
      </nav>
    </header>
  )
}

export function Footer(): React.ReactElement {
  return (
    <footer
      css={css`
        text-align: center;
      `}
    >
      <p>
        <Link to="/">Go to articles 👀</Link>
      </p>

      <p>
        Copyright © 2019
        {new Date().getFullYear() > 2019 && `-${new Date().getFullYear()}`}{" "}
        <Link
          to="/about"
          dangerouslySetInnerHTML={{ __html: "Nicolas&nbsp;Gasull" }}
        />
      </p>

      <address
        css={css`
          margin: 0;
        `}
      >
        <a href="https://www.twitter.com/ngasull">
          <SocialIcon icon="twitter" />
        </a>
        <a href="https://www.github.com/ngasull">
          <SocialIcon icon="github" />
        </a>
        <a href="https://stackoverflow.com/users/2219133/ngasull">
          <SocialIcon icon="stackoverflow" />
        </a>
        <a href="https://www.linkedin.com/in/nicolasgasull">
          <SocialIcon icon="linkedin" />
        </a>
        <Link to="/about">
          <SocialIcon icon="at" />
        </Link>
        <a href="/rss.xml">
          <SocialIcon icon="rss" />
        </a>
      </address>
    </footer>
  )
}
