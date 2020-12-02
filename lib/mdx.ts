import fs from "fs"
import matter from "gray-matter"
import { mdxComponents } from "lib/mdxComponents"
import renderToString from "next-mdx-remote/render-to-string"
import path from "path"
import util from "util"
import headings from "remark-autolink-headings"
import slug from "remark-slug"
import visit from "unist-util-visit"

type Article = {
  file: Buffer
  date: string
  lang: string
  slug: string
}

export const getArticles = async (): Promise<Article[]> => {
  const readdir = util.promisify(fs.readdir)
  const readFile = util.promisify(fs.readFile)
  return (
    await Promise.all(
      (await readdir(path.resolve("lib/posts"))).map(
        async (filename: string) => {
          const postMatch = filename.match(
            /^(\d{4}-\d\d-\d\d)-(fr|en)-([^/]+).blog.mdx$/
          )
          if (!postMatch)
            throw new Error(`Pas de la forme blog post: ${filename}`)
          const [, date, lang, slug] = postMatch
          return {
            file: await readFile(path.join("lib/posts", filename)),
            date,
            lang,
            slug,
          }
        }
      )
    )
  ).filter(Boolean)
}

export async function processRemote({ file, ...meta }: Article) {
  const { content, data } = matter(file)
  const scope = { ...meta, ...data }
  await renderToString(content, {
    mdxOptions: {
      remarkPlugins: [
        slug,
        () => (tree, file) => {
          type Toc = [{ depth: number; title?: string; slug?: string }, Toc[]]
          const stack: Toc[] = [[{ depth: 0 }, []]]
          visit(tree, "heading", (heading) => {
            let depth = stack[0][0].depth + 1

            while (heading.depth > depth) {
              if (heading.depth - depth > 1) {
                stack.unshift([{ depth }, []])
                stack[1][1].push(stack[0])
              } else {
                stack.unshift(stack[0][1][stack[0][1].length - 1])
              }
              depth += 1
            }
            while (heading.depth < depth) {
              stack.shift()
              depth -= 1
            }

            const newItem = [{ depth, slug: heading.data.id }, []]
            visit(heading, "text", (node) => {
              newItem[0].title = node.value as string
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
  const staticSource = await renderToString(content, {
    mdxOptions: {
      remarkPlugins: [
        slug,
        [
          headings,
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
    scope,
  })
  return { staticSource, scope }
}
