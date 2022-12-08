import { parseAdoc } from "lib/asciidoc"
import { GetStaticProps } from "next"

export { About as default } from "lib/About"

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const about = await (locale === "fr"
    ? parseAdoc("fr", require("lib/about.fr.adoc").default)
    : parseAdoc("en", require("lib/about.en.adoc").default))
  return {
    props: {
      scope: about,
      staticSource: about.html,
    },
  }
}
