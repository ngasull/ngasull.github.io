import { getArticles, processRemote } from "lib/mdx"
import { GetStaticPaths, GetStaticProps } from "next"

export { Article as default } from "lib/Article"

export const getStaticProps: GetStaticProps = async ({
  locale,
  params: { slug },
}) => {
  const article = (await getArticles()).find(
    (a) => a.slug === slug && a.lang === locale
  )
  console.log(article)
  if (!article) return { notFound: true }
  const { filepath, ...meta } = article
  const { staticSource, scope } = await processRemote(filepath, meta)
  return {
    props: {
      scope,
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
