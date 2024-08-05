import { useState } from 'react';

import { useBoolean, useInterval } from 'react-use';

import { useName, useSocket } from '@/common/context/storeContext';


import CreateChat from './components/CreateChat';
import JoinChat from './components/JoinChat';
import RandomChat from './components/RandomChat';

  const Home = () => {
  const socket = useSocket();
  const { name, setName } = useName();
  const [searching, setSearching] = useBoolean(false);
  const [dots, setDots] = useState(0);

  useInterval(() => {
    setDots((prev) => (prev === 3 ? 0 : prev + 1));
  }, 500);

  const handleCancelSearch = () => {
    socket.emit('leave_queue');
    setSearching(false);
  };

  return (
    <div className="flex flex-col items-center">
      {searching && (
        <div className="mt-24 flex flex-col items-center">
          <h3 className="text-2xl text-pink-600">
            Ищем собеседника для общения{'.'.repeat(dots)}
          </h3>
          <button
            className="mt-3 rounded-full bg-pink-50 px-8 py-2 font-semibold text-black hover:bg-pink-800 active:bg-pink-600"
            onClick={handleCancelSearch}
          >
            Отмена
          </button>
        </div>
      )}

      {!searching && (
        <>
          <input 
          className="input mb-10 mt-14 sm:mt-0"
          placeholder="Ваше имя" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          />
          <div className="flex w-auto flex-col items-center justify-between space-y-10 sm:w-160 md:flex-row md:items-start md:space-y-0">
            <RandomChat setSearching={setSearching} />
            <span className="hidden h-96 w-px bg-violet-100 md:block" />
            <div className="flex flex-col space-y-10">
              <JoinChat />
              <CreateChat />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
