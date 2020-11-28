import BlogLayout from "./blog"
import PlainLayout from "./plain"

const DefaultLayout: React.FC = (props) => {
  const { frontMatter } = props
  const layoutMatch = frontMatter.__resourcePath.match(/\.(\w+)\.mdx$/)
  const Layout =
    layoutMatch && layoutMatch[1] === "blog" ? BlogLayout : PlainLayout
  return <Layout {...props} />
}

export default DefaultLayout
