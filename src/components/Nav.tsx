/** @jsx jsx */

import { Link } from "gatsby"
import { jsx } from "~/theme"

const Nav: React.FC = () => {
  return (
    <nav>
      <Link to="/">Blog</Link>
      {" / "}
      <Link to="/about">About</Link>
      {" / "}
      <a href="/rss.xml">RSS</a>
    </nav>
  )
}

export default Nav
