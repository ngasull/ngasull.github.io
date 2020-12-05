import { findArticle, getArticles, processRemote } from "lib/mdx"
import { GetStaticPaths, GetStaticProps } from "next"

export { Article as default } from "lib/Article"

export const getStaticProps: GetStaticProps = async ({
  locale,
  params: { slug },
}) => {
  const article = await findArticle(locale, slug as string)
  if (!article) return { notFound: true }
  const staticSource = await processRemote(article)
  return {
    props: {
      scope: article,
      staticSource,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: (await getArticles()).map(({ lang, slug }) => ({
      locale: lang,
      params: { slug },
    })),
    fallback: false,
  }
}
