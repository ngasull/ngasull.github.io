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
            slug
          }
          frontmatter {
            path
            date
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
    createPage({
      path: post.frontmatter.path,
      component: mdxTemplate,
      context: {
        slug: post.fields.slug,
      },
    })

    // Maintain links to first 2 articles
    if (new Date(post.frontmatter.date) < new Date("2020-02-09")) {
      createPage({
        path: post.frontmatter.path.replace(/^\/blog/, ""),
        component: redirectTemplate,
        context: {
          redirect: post.frontmatter.path,
        },
      })
    }
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
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
