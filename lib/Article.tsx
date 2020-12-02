import { Layout } from "lib/Layout"
import { mdxComponents } from "lib/mdxComponents"
import hydrate from "next-mdx-remote/hydrate"

export const Article: React.FC<{
  staticSource: string
  scope: {
    lang: string
    slug: string
    date: string
    title: string
    categories: string[]
  }
}> = ({ staticSource, scope }) => {
  const { lang, title } = scope
  const content = hydrate(staticSource, { components: mdxComponents, scope })
  return (
    <Layout title={title}>
      <h1>{title}</h1>

      <h6 className="pb-8">
        {new Date(scope.date).toLocaleDateString(lang, {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </h6>

      {content}
    </Layout>
  )
}
