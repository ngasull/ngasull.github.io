import { getArticles } from "lib/asciidoc"
import { generateRSSEn, generateRSSFr } from "lib/rss"
import { GetStaticProps } from "next"

export { Blog as default } from "lib/Blog"

export const getStaticProps: GetStaticProps = async ({ locale = null }) => {
  const articles = (await getArticles()).filter(
    (a) => a.lang === (locale || "en")
  )

  if (locale === "fr") await generateRSSFr(articles)
  else await generateRSSEn(articles)

  return {
    props: {
      locale,
      articles,
    },
  }
}
