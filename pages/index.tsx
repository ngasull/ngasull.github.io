import { GetServerSideProps } from "next"

const HomePage: React.FC = () => {
  return null
}
export default HomePage

export const getServerSideProps: GetServerSideProps = async ({
  resolvedUrl,
}) => {
  return {
    props: {},
    redirect: {
      destination: `${resolvedUrl}blog`,
      permanent: false,
    },
  }
}
