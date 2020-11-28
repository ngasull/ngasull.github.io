module.exports = withMDX({
  target: "serverless",
  pageExtensions: ["ts", "tsx", "mdx"],
  devIndicators: {
    autoPrerender: false,
  },
  poweredByHeader: false,
})

function withMDX(nextOpts) {
  const config = {
    fileExtensions: ["plain.mdx"],
    layoutPath: "layouts",
    defaultLayout: true,
    rehypePlugins: [
      require("rehype-slug"),
      [
        require("rehype-autolink-headings"),
        {
          behavior: "append",
          properties: { className: ["anchor"], ariaHidden: true, tabIndex: -1 },
          content: {
            type: "element",
            tagName: "svg",
            properties: {
              className: "anchor",
            },
            children: [
              {
                type: "element",
                tagName: "use",
                properties: {
                  xlinkHref: "/svg/icons.svg#anchor",
                },
              },
            ],
          },
        },
      ],
    ],
  }
  const blogConfig = {
    ...config,
    fileExtensions: ["blog.mdx"],
    rehypePlugins: [
      ...config.rehypePlugins,
      [
        require("rehype-toc"),
        {
          customizeTOC: (toc) => {
            return {
              ...toc,
              tagName: "details",
              properties: { open: true },
              children: [
                {
                  type: "element",
                  tagName: "summary",
                  children: [{ type: "text", value: "Table of contents" }],
                },
                ...toc.children,
              ],
            }
          },
        },
      ],
    ],
  }
  return require("next-mdx-enhanced")(config)(
    require("next-mdx-enhanced")(blogConfig)(nextOpts)
  )
}
