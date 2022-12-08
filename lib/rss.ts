import RSS from "rss"
import fs from "fs"
import path from "path"
import showdown from "showdown"
import util from "util"
import { Article } from "lib/asciidoc"

function getBaseOpts() {
  const url = "https://nglab.pro"
  return {
    site_url: url,
    image_url: `${url}/icon.png`,
    managingEditor: "ng@nglab.pro",
    webMaster: "ng@nglab.pro",
    copyright: `${new Date().getFullYear()} Nicolas Gasull`,
    pubDate: new Date(),
    ttl: 60,
  }
}

export async function generateRSSFr(articles: Article[]): Promise<void> {
  const mkdir = util.promisify(fs.mkdir)
  const writeFile = util.promisify(fs.writeFile)
  const baseOpts = getBaseOpts()
  const feed = new RSS({
    ...baseOpts,
    title: "Nico's Lab",
    description:
      "Experiences and thoughts of a developer who enjoys functional programming and aspires to game design.",
    feed_url: `${baseOpts.site_url}/fr/rss.xml`,
    language: "fr",
  })

  for (const article of articles) {
    const converter = new showdown.Converter()
    const html = converter.makeHtml(article.html)
    feed.item({
      title: article.title,
      description: html,
      url: `${baseOpts.site_url}/${article.slug}`,
      categories: article.categories || [],
      author: "Nicolas Gasull",
      date: new Date(article.date || 0).toISOString(),
    })
  }

  await mkdir(path.resolve("public/fr")).catch(() => {
    // noop
  })
  await Promise.all([
    writeFile(path.resolve("public/fr/rss.xml"), feed.xml(), "utf8"),
  ])
  console.log(`Generated RSS feed`)
}

export async function generateRSSEn(articles: Article[]): Promise<void> {
  const mkdir = util.promisify(fs.mkdir)
  const writeFile = util.promisify(fs.writeFile)
  const baseOpts = getBaseOpts()
  const feed = new RSS({
    ...baseOpts,
    title: "Nico's Lab",
    description:
      "Experiences and thoughts of a developer who enjoys functional programming and aspires to game design.",
    feed_url: `${baseOpts.site_url}/en/rss.xml`,
    language: "en",
  })

  for (const article of articles) {
    const converter = new showdown.Converter()
    const html = converter.makeHtml(article.html)
    feed.item({
      title: article.title,
      description: html,
      url: `${baseOpts.site_url}/${article.slug}`,
      categories: article.categories || [],
      author: "Nicolas Gasull",
      date: new Date(article.date || 0).toISOString(),
    })
  }

  await mkdir(path.resolve("public/en")).catch(() => {
    // noop
  })
  await writeFile(path.resolve("public/rss.xml"), feed.xml(), "utf8")
  console.log(`Generated RSS feed`)
}
