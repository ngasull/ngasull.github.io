import { GetServerSideProps } from "next"

const HomePage: React.FC = () => {
  return null
}
export default HomePage

export const getServerSideProps: GetServerSideProps = async ({
  defaultLocale,
  locale,
}) => {
  return {
    props: {},
    redirect: {
      destination: locale === defaultLocale ? "/blog" : `/${locale}/blog`,
      permanent: false,
    },
  }
}
