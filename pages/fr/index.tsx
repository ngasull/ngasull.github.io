import { default as Page, getStaticProps as enGetStaticProps } from "pages"
import { GetStaticProps } from "next"

export default Page

export const getStaticProps: GetStaticProps = (context) =>
  enGetStaticProps({ ...context, locale: "fr" })
