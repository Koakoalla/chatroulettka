import { useEffect, useState } from 'react';
import { useCopyToClipboard } from 'react-use';
import { useRoom } from '@/common/context/storeContext';

const Info = () => {
  const room = useRoom();
  const [show, setShow] = useState(false);
  const [copied, copyToClipboard] = useCopyToClipboard();

  useEffect(() => {
    if (copied.value) {
      setShow(true);

      setTimeout(() => {
        setShow(false);
      }, 1250);
    }
  }, [copied]);

  return (
    <>
      <h2 className="text-4xl font-bold text-zinc-200">Приватная комната</h2>
      <div className="flex space-x-3">
        <h4 className="text-2xl font-bold text-zinc-400">{room.id}</h4>
        <div className="relative">
          {show && (
            <div className="absolute bottom-full mb-2 rounded-2xl bg-black px-5 py-3">
              Скопировано!
            </div>
          )}

          <button
            className="btn btn-primary h-full px-2 py-1 text-sm"
            onClick={() => copyToClipboard(room.id)}
          >
            Скопировать id
          </button>
        </div>
      </div>
    </>
  );
};

export default Info;