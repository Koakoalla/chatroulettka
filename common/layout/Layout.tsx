/* eslint-disable @next/next/no-title-in-document-head */
import Head from 'next/head';

import StoreProvider from '../context/storeContext';

const Layout = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  return (
    <StoreProvider>
      <Head>
        <title>Анонимка | Сервис для поиска собеседников</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-cyan-900 flex h-full w-full flex-col items-center text-pink-300">
        <h1 className="self-center mt-12 w-max text-6xl font-bold">
          Анонимка
        </h1>
        <h2 className="mb-3 w-max text-9xl font-bold text-opacity-10">
          Сервис для поиска собеседников
        </h2>
        {children}
      </div>
    </StoreProvider>
  );
};

export default Layout;
