const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require("path")

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  const mdxTemplate = path.resolve("src/templates/mdxTemplate.tsx")
  const redirectTemplate = path.resolve("src/templates/redirectTemplate.tsx")
  const result = await graphql(`
    {
      allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
        nodes {
          fields {
            date
            lang
            slug
            path
          }
          frontmatter {
            categories
          }
        }
      }
    }
  `)

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  result.data.allMdx.nodes.forEach((post, index) => {
    const { date, lang, slug, path, ...contextFields } = post.fields

    createPage({
      path,
      component: mdxTemplate,
      context: { slug },
    })

    // Maintain links to first 2 articles
    if (new Date(date) < new Date("2020-02-09")) {
      createPage({
        path: `/${slug}`,
        component: redirectTemplate,
        context: { slug },
      })
    }
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `Mdx`) {
    const [_, date, lang, slug] = createFilePath({ node, getNode }).match(
      /^\/(\d\d\d\d-\d\d-\d\d)-(fr|en)-([\w-]+)\/$/
    )
    const path = `/${lang}/blog/${slug}`
    createNodeField({
      name: `date`,
      node,
      value: date,
    })
    createNodeField({
      name: `lang`,
      node,
      value: lang,
    })
    createNodeField({
      name: `slug`,
      node,
      value: slug,
    })
    createNodeField({
      name: `path`,
      node,
      value: path,
    })
  }
}

exports.onCreateWebpackConfig = ({ actions, getConfig, loaders, rules }) => {
  getConfig().module.rules.forEach(rule => {
    if (rule.test && rule.test.toString().match("svg|jpg|jpeg|png|gif")) {
      Object.assign(rule, {
        exclude: [path.resolve(__dirname, "src/images")],
      })
    }
  })
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "src"),
      },
    },
    module: {
      rules: [
        {
          use: [
            {
              ...loaders.url(),
              options: { ...loaders.url().options, limit: 1 },
            },
          ],
          test: /\.(ico|svg|jpg|jpeg|png|gif|webp)(\?.*)?$/,
          include: [path.resolve(__dirname, "src/images")],
        },
      ],
    },
  })
}
