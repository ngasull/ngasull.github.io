import {
  default as Page,
  getStaticPaths as enGetStaticPaths,
  getStaticProps as enGetStaticProps,
} from "pages/blog/[slug]"
import { GetStaticPaths, GetStaticProps } from "next"

export default Page

export const getStaticProps: GetStaticProps = (context) =>
  enGetStaticProps({ ...context, locale: "fr" })

export const getStaticPaths: GetStaticPaths = (context) =>
  enGetStaticPaths({ ...context, locales: ["fr"] })
