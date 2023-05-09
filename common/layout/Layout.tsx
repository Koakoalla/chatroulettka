/* eslint-disable @next/next/no-title-in-document-head */
import Head from "next/head";
import { useEffect } from "react";
import StoreProvider from "../context/storeContext";

const Layout = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  useEffect(() => {
    const handleScroll = (e: any) => {
      if (!e.target.classList?.constains("on-scrollbar")) {
        e.target.classList?.add("on-scrollbar");
        setTimeout(() => {
          e.target.classList?.remove("on-scrollbar");
        }, 1000);
      }
    };
    window.addEventListener("scroll", handleScroll, true);
    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, []);

  return (
    <StoreProvider>
      <Head>
        <title>Анонимка | Сервис для поиска собеседников</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex h-full w-full flex-col items-center bg-cyan-600 text-pink-300">
        <h1 className="mt-12 w-max self-center text-6xl font-bold">Анонимка</h1>
        <h2 className="text-9xl mb-3 w-max font-bold text-opacity-10">
          Сервис для поиска собеседников
        </h2>
        {children}
      </div>
    </StoreProvider>
  );
};

export default Layout;
