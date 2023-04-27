import { useName, useSocket } from '@/common/context/storeContext';

const CreateChat = () => {
  const socket = useSocket();
  const { name } = useName();

  const handleCreateRoom = () => {
    socket.emit('create_new', name);
  };

  return (
    <div className=" flex w-72 flex-col items-center">
      <h3 className="text-3xl font-bold">Создать чат</h3>
      <p className="-mt-2 mb-2 w-2/3 text-center leading-5 text-gray-400">
        Создать комнату с уникальным ID
      </p>
      <button className="btn btn-primary" onClick={handleCreateRoom}>
        Создать
      </button>
    </div>
  );
};

export default CreateChat;
