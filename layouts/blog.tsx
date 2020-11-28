import { Layout } from "lib/components/Layout"

const BlogLayout: React.FC = ({ children, frontMatter }) => {
  const dateMatch = frontMatter.__resourcePath.match(
    /\/(\d{4}-\d\d-\d\d)-(fr|en)-(.+)$/
  )
  return (
    <Layout title={frontMatter.title}>
      <h1>{frontMatter.title}</h1>

      <h6 className="pb-8">
        {new Date(dateMatch[1]).toLocaleDateString(dateMatch[2], {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </h6>
      {children}
    </Layout>
  )
}

export default BlogLayout
