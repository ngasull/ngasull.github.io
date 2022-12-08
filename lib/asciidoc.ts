import asciidoctor from "@asciidoctor/core"
import html5s from "asciidoctor-html5s"
import hljs from "highlight.js"
import { JSDOM } from "jsdom"

export type DocPage = {
  date: string
  lang: string
  title: string
  html: string
}

export type Article = DocPage & {
  date: string
  slug: string
  categories: string[]
}

export type ArticleListing = {
  article: () => Promise<Article>
  date: string
  lang: string
  slug: string
}

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

export function lsArticles(): ArticleListing[] {
  return [
    ...(process.env.NODE_ENV === "production"
      ? []
      : getFromDir(
          require.context("lib/drafts", false, /^lib\/drafts\/.+\.adoc?$/)
        )),
    ...getFromDir(
      require.context("lib/posts", false, /^lib\/posts\/.+\.adoc?$/)
    ),
  ]

  function getFromDir(r: ReturnType<typeof require.context>) {
    return r.keys().flatMap((key) => {
      const postMatch = key.match(/\/(\d{4}-\d\d-\d\d)-(fr|en)-([^/]+)\.adoc$/)
      if (!postMatch) throw new Error(`Pas de la forme blog post: ${key}`)
      const [, date, lang, slug] = postMatch
      return {
        date,
        lang,
        slug,
        article: async (): Promise<Article> => ({
          date,
          slug,
          ...parseAdoc(lang, r(key).default, {
            attributes: {
              toc: "preamble",
            },
          }),
        }),
      }
    })
  }
}

export function parseAdoc(
  lang: string,
  source: string,
  opts: { attributes?: Record<string, string | boolean> } = {}
): Omit<Article, "date" | "slug" | "toc"> {
  const adoc = asciidoctor()
  html5s.register()

  const doc = adoc.load(source, {
    backend: "html5s",
    safe: "server",
    attributes: {
      experimental: true,
      "toc-title": lang === "fr" ? "Table des matières" : "Summary",
      "example-caption": false,
      "figure-caption": false,
      "caution-caption": "☢️ " + (lang === "fr" ? "Danger " : "Caution"),
      "important-caption": "❗ " + (lang === "fr" ? "Important " : "Important"),
      "note-caption": "📎 " + (lang === "fr" ? "Note " : "Note"),
      "tip-caption": "💡 " + (lang === "fr" ? "Conseil " : "Tip"),
      "warning-caption": "⚠️ " + (lang === "fr" ? "Attention " : "Warning"),
      "source-highlighter": "highlightjs",
      ...opts.attributes,
    },
  })
  doc.setAttribute("toc", "preamble", false)

  const { document } = new JSDOM(doc.getContent()).window
  for (const el of document.querySelectorAll(".hljs")) {
    if (el.dataset.lang) hljs.highlightElement(el)
  }

  return {
    lang,
    title: doc.getTitle(),
    html: document.body.innerHTML,
    categories:
      doc.getAttribute("categories")?.replace(/\s/g, "").split(",") || [],
  }
}
