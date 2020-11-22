import SocialIcon from "lib/components/SocialIcon"
import { useRouter } from "next/dist/client/router"
import Link from "next/link"

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      <main aria-label="Content">{children}</main>
      <Footer />
    </>
  )
}

function Header(): React.ReactElement {
  const router = useRouter()
  const lang = router.locale
  return (
    <header>
      <h1>{lang === "fr" ? "Le labo de Nico" : "Nico's lab"}</h1>
      <h3>{"🔭🎶🕺"}</h3>
      <nav>
        <Link href="/">Blog</Link>
        {" / "}
        <Link href="/about">{lang === "fr" ? "À propos" : "About"}</Link>
        {" / "}
        <Link href="/rss.xml">RSS</Link>
        {" / "}
        <Link href="/" locale={lang === "fr" ? "en" : "fr"}>
          {lang !== "fr" ? "🇫🇷" : "🇬🇧"}
        </Link>
      </nav>
      <style jsx>{`
        header {
          display: grid;
          grid-template: "a b" "c c";
          justify-content: space-between;
        }

        @media (max-width: 750px) {
          header {
            grid-template: "a" "b" "c";
          }
          header h3 {
            padding: 0.5rem 0;
          }
        }
      `}</style>
    </header>
  )
}

export function Footer(): React.ReactElement {
  const router = useRouter()
  return (
    <footer className="mt-8 text-center">
      {!false && (
        <p>
          <Link href="/">
            {router.locale === "fr"
              ? "Retour aux articles  👀"
              : "Go to articles 👀"}
          </Link>
        </p>
      )}

      <p>
        Copyright © 2019
        {new Date().getFullYear() > 2019 && `-${new Date().getFullYear()}`}{" "}
        <Link href="/about">{"Nicolas\xa0Gasull"}</Link>
      </p>

      <address className="space-x-5">
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
        <Link href="/about">
          <a>
            <SocialIcon icon="at" />
          </a>
        </Link>
        <Link href="/rss.xml">
          <a>
            <SocialIcon icon="rss" />
          </a>
        </Link>
      </address>
    </footer>
  )
}
