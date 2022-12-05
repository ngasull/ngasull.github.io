import matter from "gray-matter"
import { mdxComponents } from "lib/mdxComponents"
import renderToString from "next-mdx-remote/render-to-string"
import remarkAutolinkHeadings from "remark-autolink-headings"
import remarkSlug from "remark-slug"
import visit from "unist-util-visit"

export type MdxPage = {
  content: string
  lang: string
  title: string
}

export type Article = MdxPage & {
  date: string
  slug: string
  categories: string[]
  toc: Toc[]
}

export type Toc = [{ depth: number; title?: string; slug?: string }, Toc[]]

export async function getArticles(): Promise<Article[]> {
  return (await Promise.all(lsArticles().map((a) => a.article()))).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  )
}

export async function findArticle(
  locale: string,
  slug: string
): Promise<Article | null> {
  return lsArticles()
    .find((a) => a.lang === locale && a.slug === slug)
    ?.article()
}

export function lsArticles(): {
  article: () => Promise<Article>
  date: string
  lang: string
  slug: string
}[] {
  return [
    ...(process.env.NODE_ENV === "production"
      ? []
      : getFromDir(
          require.context("lib/drafts", false, /^lib\/drafts\/.+\.mdx?$/)
        )),
    ...getFromDir(
      require.context("lib/posts", false, /^lib\/posts\/.+\.mdx?$/)
    ),
  ]

  function getFromDir(r: ReturnType<typeof require.context>) {
    return r.keys().flatMap((key) => {
      const postMatch = key.match(/\/(\d{4}-\d\d-\d\d)-(fr|en)-([^/]+)\.mdx$/)
      if (!postMatch) throw new Error(`Pas de la forme blog post: ${key}`)
      const [, date, lang, slug] = postMatch
      return {
        date,
        lang,
        slug,
        article: async () =>
          ({
            date,
            slug,
            toc: [],
            ...(await parseMdx(lang, r(key).default)),
          } as Article),
      }
    })
  }
}

export async function parseMdx(lang: string, mdx: string): Promise<MdxPage> {
  const { content, data } = matter(mdx)
  const scope = {
    ...data,
    content,
    lang,
  } as MdxPage
  await renderToString(content, {
    mdxOptions: {
      remarkPlugins: [
        remarkSlug,
        () => (tree, file) => {
          const stack: Toc[] = [[{ depth: 0 }, []]]
          visit(tree, "heading", (heading) => {
            let depth = stack[0][0].depth + 1
            const hdepth = (heading as any).depth

            while (hdepth > depth) {
              if ((hdepth as number) - depth > 1) {
                stack.unshift([{ depth }, []])
                stack[1][1].push(stack[0])
              } else {
                stack.unshift(stack[0][1][stack[0][1].length - 1])
              }
              depth += 1
            }
            while (hdepth < depth) {
              stack.shift()
              depth -= 1
            }

            const newItem: Toc = [
              {
                depth,
                slug: (heading.data?.id as string | null) || "needs-slug-id",
              },
              [],
            ]
            visit(heading, "text", (node) => {
              newItem[0].title = (node as any).value as string
            })
            stack[0][1].push(newItem)
          })
          file.data.toc = stack[stack.length - 1][1]
        },
        () => (tree, file) => {
          Object.assign(scope, file.data)
        },
      ],
    },
    components: mdxComponents,
    scope,
  })
  return scope
}

export async function processRemote(page: MdxPage): Promise<string> {
  return await renderToString(page.content, {
    mdxOptions: {
      remarkPlugins: [
        remarkSlug,
        [
          remarkAutolinkHeadings,
          {
            behavior: "append",
            properties: {
              className: ["anchor"],
              ariaHidden: true,
              tabIndex: -1,
            },
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
    },
    components: mdxComponents,
    scope: page,
  })
}
