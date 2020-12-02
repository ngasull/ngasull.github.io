import { getArticles, processRemote } from "lib/mdx"
import { GetStaticProps } from "next"

export { Blog as default } from "lib/Blog"

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      articles: await Promise.all(
        (await getArticles())
          .filter((a) => a.lang === locale)
          .map(async (article) => {
            const { scope } = await processRemote(article)
            return scope
          })
      ),
    },
  }
}
