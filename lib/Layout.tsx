import SocialIcon from "lib/SocialIcon"
import Head from "next/head"
import { LocaLink } from "lib/LocaLink"
import { useLang } from "./useLocale"

export const Layout: React.FC<{
  children: React.ReactNode
  articleTitle?: string
}> = ({ children, articleTitle }) => {
  const lang = useLang()
  return (
    <>
      <Head>
        <title>{`${articleTitle || "Articles"} | Nico's Lab`}</title>
      </Head>
      <Header lang={lang} />
      <main aria-label="Content">{children}</main>
      <Footer lang={lang} showBack={!!articleTitle} />
    </>
  )
}

const Header: React.FC<{ lang: string }> = ({ lang }) => {
  return (
    <header className="ng-header">
      <h1>{lang === "fr" ? "Le labo de Nico" : "Nico's lab"}</h1>
      <h3 className="py-2 md:p-0">{"🔭 🎶 🕺"}</h3>
      <nav>
        <LocaLink href="/">Blog</LocaLink>
        {" / "}
        <LocaLink href="/about">
          {lang === "fr" ? "À propos" : "About"}
        </LocaLink>
        {" / "}
        <LocaLink href="/rss.xml">RSS</LocaLink>
        {" / "}
        <LocaLink href="/" locale={lang === "fr" ? "en" : "fr"}>
          {lang !== "fr" ? "🇫🇷" : "🇬🇧"}
        </LocaLink>
      </nav>
    </header>
  )
}

export const Footer: React.FC<{ lang: string; showBack: boolean }> = ({
  lang,
  showBack,
}) => {
  return (
    <footer className="mt-8 text-center">
      {showBack && (
        <p>
          <LocaLink href="/blog">
            {lang === "fr" ? "Retour aux articles  👀" : "Go to articles 👀"}
          </LocaLink>
        </p>
      )}

      <p>
        Copyright © 2019
        {new Date().getFullYear() > 2019 && `-${new Date().getFullYear()}`}{" "}
        <LocaLink href="/about">{"Nicolas\xa0Gasull"}</LocaLink>
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
        <LocaLink href="/about">
          <SocialIcon icon="at" />
        </LocaLink>
        <LocaLink href="/rss.xml">
          <SocialIcon icon="rss" />
        </LocaLink>
      </address>
    </footer>
  )
}
