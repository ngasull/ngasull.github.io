import { getArticles, lsArticles } from "lib/asciidoc"
import { GetStaticPaths, GetStaticProps } from "next"

export { Article as default } from "lib/Article"

export const getStaticProps: GetStaticProps = async ({
  locale = null,
  params: { slug },
}) => {
  const article = (await getArticles()).find((a) => a.slug === slug)
  if (!article) return { notFound: true }
  return {
    props: {
      locale,
      scope: article,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  return {
    paths: lsArticles()
      .filter(({ lang }) => (locales || ["en"]).includes(lang))
      .map(({ slug }) => ({
        params: { slug },
      })),
    fallback: false,
  }
}
