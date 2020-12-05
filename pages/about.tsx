import { parseMdx, processRemote } from "lib/mdx"
import { GetStaticProps } from "next"

export { About as default } from "lib/About"

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const about = await (locale === "fr"
    ? parseMdx("fr", require("lib/about.fr.mdx").default)
    : parseMdx("en", require("lib/about.en.mdx").default))
  return {
    props: {
      scope: about,
      staticSource: await processRemote(about),
    },
  }
}
