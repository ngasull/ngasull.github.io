import { AppProps } from "next/app"

import "lib/style.css"

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default App
