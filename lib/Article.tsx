import { Layout } from "lib/Layout"
import { DocPage } from "./asciidoc"

export const Article: React.FC<{
  scope: DocPage
}> = ({ scope }) => {
  const { lang, title, html } = scope
  return (
    <Layout articleTitle={title}>
      <h1>{title}</h1>

      <h6 className="pb-8">
        {new Date(scope.date).toLocaleDateString(lang, {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </h6>

      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  )
}
