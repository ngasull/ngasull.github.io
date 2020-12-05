declare module "remark-autolink-headings"
declare module "remark-slug"

module "next-mdx-remote/render-to-string" {
  declare function renderToString(
    content: string,
    opts: {
      mdxOptions: { remarkPlugins: unknown[] }
      scope: Record<string, unknown>
      components: Record<string, React.ComponentType<unknown> | string>
    }
  )
  export default renderToString
}
