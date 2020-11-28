import { Layout } from "lib/components/Layout"

const PlainLayout: React.FC = ({ children, frontMatter }) => {
  return (
    <Layout title={frontMatter.title}>
      <h1>{frontMatter.title}</h1>
      {children}
    </Layout>
  )
}

export default PlainLayout
