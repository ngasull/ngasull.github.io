import { getArticles } from "lib/mdx"
import { generateRSSEn, generateRSSFr } from "lib/rss"
import { GetStaticProps } from "next"

export { Blog as default } from "lib/Blog"

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const articles = await Promise.all(
    (await getArticles()).filter((a) => a.lang === locale)
  )
  if (locale === "en") {
    await generateRSSEn(articles)
  } else {
    await generateRSSFr(articles)
  }
  return {
    props: {
      articles,
    },
  }
}
