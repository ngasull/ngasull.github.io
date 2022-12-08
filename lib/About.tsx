import { Layout } from "lib/Layout"

export const About: React.FC<{
  staticSource: string
  scope: {
    lang: string
    title: string
  }
}> = ({ staticSource, scope }) => {
  const { title } = scope
  return (
    <Layout articleTitle={title}>
      <div dangerouslySetInnerHTML={{ __html: staticSource }} />
    </Layout>
  )
}
