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
      <h2 className="mt-5 text-2xl font-bold text-zinc-200 sm:mt-0  md:text-3xl lg:text-4xl">
        Приватная комната
      </h2>
      <div className="flex flex-col items-center sm:flex-row sm:space-x-3">
        <h4 className="text-center text-base font-bold text-zinc-400 md:text-xl lg:text-2xl">
          {room.id}
        </h4>
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