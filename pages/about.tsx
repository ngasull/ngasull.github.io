import { processRemote } from "lib/mdx"
import { GetStaticProps } from "next"

export { About as default } from "lib/About"

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const { staticSource, scope } = await processRemote(
    `lib/about.${locale}.mdx`,
    {}
  )
  return {
    props: {
      scope,
      staticSource,
    },
  }
}
