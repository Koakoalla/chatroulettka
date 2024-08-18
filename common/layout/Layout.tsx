/* eslint-disable @next/next/no-title-in-document-head */
import Head from 'next/head';
import { useEffect, useState } from 'react';
import StoreProvider from '../context/storeContext';
import PeersProvider from '@/common/context/peersContext';
import StreamsProvider from '@/common/context/streamContext';

import { motion } from 'framer-motion';

const Layout = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const [blocked, setBlocked] = useState(true);
  useEffect(() => {
    const handleScroll = (e: any) => {
      if (!e.target.classList?.constains('on-scrollbar')) {
        e.target.classList?.add('on-scrollbar');
        setTimeout(() => {
          e.target.classList?.remove('on-scrollbar');
        }, 1000);
      }
    };
    window.addEventListener('scroll', handleScroll, true);
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then(() => setBlocked(false))
      .catch(() => {
        setBlocked(true);
      });

    return () => {
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, []);
  if (blocked)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="transition-none"
      >
        <h1 className="mt-60 px-5 text-center text-xl font-bold">
          Вам нужно предоставить доступ к медиаустройствам (микрофон, камера)
          для использования этого приложения (не волнуйтесь, эти устройства
          будут использоваться только по вашему запросу).
        </h1>
      </motion.div>
    );

  return (
    <StoreProvider>
      <PeersProvider>
        <StreamsProvider>
          <Head>
            <title>Анонимка | Сервис для поиска собеседников</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <motion.div
            className="flex h-full w-full flex-col items-center transition-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <>
              <h1 className="mt-12 w-max self-center text-6xl font-bold">
                Анонимка
              </h1>
              <h2 className="text-9xl mb-3 w-max font-bold text-opacity-10">
                Сервис для поиска собеседников
              </h2>
              {children}
            </>
          </motion.div>
        </StreamsProvider>
      </PeersProvider>
    </StoreProvider>
  );
};

export default Layout;
