import "../common/styles/global.css";
import type { AppProps } from "next/app";
import Head from "next/head";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Chatroulette | анонимная социальная сеть для поиска собеседников</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default App;
