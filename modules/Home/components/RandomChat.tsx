import { useName, useSocket } from '@/common/context/storeContext';

const RandomChat = ({
  setSearching,
}: {
  setSearching: (nextValue?: any) => void;
}) => {
  const socket = useSocket();
  const { name } = useName();

  const handleSearchRoom = () => {
    socket.emit('join_new', { region: 'russia', name });
    setSearching(true);
  };

  return (
    <div className="mt-20 flex w-72 flex-col items-center">
      <h3 className="text-3xl font-bold">Случайный чат</h3>
      <p className="-mt-2 mb-2 text-gray-400">Найти случайных собеседников</p>
      <button className="btn btn-primary" onClick={handleSearchRoom}>
        Поиск
      </button>
    </div>
  );
};

export default RandomChat;
