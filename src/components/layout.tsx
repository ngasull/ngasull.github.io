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
  hideBack,
  lang,
}: {
  children: React.ReactNode
  hideBack?: boolean
  lang: "fr" | "en"
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
      <Header lang={lang} />
      <main aria-label="Content">{children}</main>
      <Footer hideBack={hideBack} lang={lang} />
    </Fragment>
  )
}

function Header({ lang }: { lang: "fr" | "en" }): React.ReactElement {
  return (
    <header
      css={css`
        display: grid;
        grid-template: "a b" "c c";
        justify-content: space-between;

        @media (max-width: 750px) {
          grid-template: "a" "b" "c";

          & h3 {
            padding: 0.5rem 0;
          }
        }
      `}
    >
      <h1>{lang === "fr" ? "Le labo de Nico" : "Nico's lab"}</h1>
      <h3>{"🔭🎶🕺"}</h3>
      <nav>
        <Link to={`/${lang}`}>Blog</Link>
        {" / "}
        <Link to={`/${lang}/about`}>
          {lang === "fr" ? "À propos" : "About"}
        </Link>
        {" / "}
        <a href="/rss.xml">RSS</a>
        {" / "}
        <Link to={lang === "fr" ? "/en" : "/fr"}>
          {lang !== "fr" ? "🇫🇷" : "🇬🇧"}
        </Link>
      </nav>
    </header>
  )
}

export function Footer({
  hideBack,
  lang,
}: {
  hideBack?: boolean
  lang: "fr" | "en"
}): React.ReactElement {
  return (
    <footer
      css={css`
        text-align: center;
      `}
    >
      {!hideBack && (
        <p>
          <Link to={`/${lang}/`}>
            {lang === "fr" ? "Retour aux articles  👀" : "Go to articles 👀"}
          </Link>
        </p>
      )}

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
        <Link to={`/${lang}/about`}>
          <SocialIcon icon="at" />
        </Link>
        <a href="/rss.xml">
          <SocialIcon icon="rss" />
        </a>
      </address>
    </footer>
  )
}
