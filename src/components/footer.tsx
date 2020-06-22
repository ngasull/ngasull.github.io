/** @jsx jsx */

import { Link } from "gatsby"
import SocialIcon from "~/components/SocialIcon"
import { css, jsx } from "~/theme"

export default function Footer({ location }): React.ReactElement {
  return (
    <footer
      css={css`
        text-align: center;
      `}
    >
      {location.pathname !== "/" && (
        <p>
          <Link to="/">Go to articles 👀</Link>
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
