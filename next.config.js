const withMDX = require("next-mdx-enhanced")({
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
})

module.exports = withMDX({
  pageExtensions: ["ts", "tsx", "mdx"],
  devIndicators: {
    autoPrerender: false,
  },
  poweredByHeader: false,
})
