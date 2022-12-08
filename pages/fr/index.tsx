import { GetStaticProps } from "next"

const HomePage: React.FC = () => {
  return null
}
export default HomePage

export const getStaticProps: GetStaticProps = () => {
  return {
    redirect: {
      destination: "/fr/blog",
      permanent: false,
    },
  }
}
