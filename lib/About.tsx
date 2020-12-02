import { Layout } from "lib/Layout"
import { mdxComponents } from "lib/mdxComponents"
import hydrate from "next-mdx-remote/hydrate"

export const About: React.FC<{
  staticSource: string
  scope: {
    lang: string
    title: string
  }
}> = ({ staticSource, scope }) => {
  const { title } = scope
  const content = hydrate(staticSource, { components: mdxComponents, scope })
  return <Layout title={title}>{content}</Layout>
}
