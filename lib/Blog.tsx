import { Layout } from "lib/Layout"
import Link from "next/link"

export const Blog: React.FC<{
  articles: Array<{
    lang: string
    slug: string
    title: string
    date: string
    categories: string[]
  }>
}> = ({ articles }) => {
  return (
    <Layout>
      <h1>Articles</h1>
      {articles.map(({ lang, slug, title, date, categories }) => (
        <article key={slug}>
          <h3>
            <Link href={`/blog/${slug}`}>{`📖 ${title}`}</Link>
          </h3>
          {`Blog » ${new Date(date).toLocaleString(lang, {
            // @ts-ignore It just works
            dateStyle: "medium",
          })} » ${categories.join(" ")}`}
        </article>
      ))}
    </Layout>
  )
}
