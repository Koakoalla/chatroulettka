import Label from '@/common/components/Label';
import { useMemo } from 'react';
import { useRoom, useSocket } from '@/common/context/storeContext';
import { getTime } from '@/common/utils/functions/function';
const Message = ({ author, message }: MessageType) => {
  const socket = useSocket();
  const mine = socket.id === author.id;
  const room = useRoom();
  const color = room.colorsAssociated.get(author.id);

  const time = useMemo(() => getTime(), []);
  return (
    <div className={`flex w-2/3 flex-col ${mine && 'self-end'}`}>
      <div
        className={`mx-1 mt-1 flex ${
          mine ? 'flex-row-reverse' : 'flex-row'
        } items-start`}
      >
        <Label color={color || 'blue'}>{message}</Label>
      </div>
      <div
        className={`mx-1 mt-1 flex ${
          mine ? 'flex-row-reverse' : 'flex-row'
        } items-start`}
      >
        <p className="px-1 font-bold text-zinc-500">{time}</p>
        {author.name && (
          <p className={`text-zinc-200 ${mine && 'text-right'}`}>
            {author.name}
          </p>
        )}
      </div>
    </div>
  );
};

export default Message;
