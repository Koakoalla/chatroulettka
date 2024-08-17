import { useEffect, useRef } from 'react';

import { useList } from 'react-use';

import { useSocket } from '@/common/context/storeContext';

import Message from './Message';
import MessageInput from './MessageInput';

const Chat = () => {
  const socket = useSocket();

  const [messages, messagesHandler] = useList<MessageType>();

  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = chatRef.current;

    socket.on('new_msg', (message) => {
      messagesHandler.push(message);
      if (node) {
        node.scrollTo({ top: node.scrollHeight });
      }
    });

    return () => {
      socket.off('new_msg');
    };
  }, [messagesHandler, socket]);

  return (
    <div className="h-chat flex justify-between">
      <span className="hidden h-full w-px bg-zinc-600 md:block" />
      <div className="relative flex h-full w-full flex-col">
        <div
          className="h-msgs overflow-overlay absolute top-0 flex w-full flex-col space-y-4 p-5 pb-0"
          ref={chatRef}
        >
          <div className="self-center font-bold text-pink-300 ">Чат начат</div>
          {messages.map((message) => (
            <Message key={message.id} {...message} />
          ))}
        </div>
        <MessageInput />
      </div>
      <span className="hidden h-full w-px bg-pink-300 md:block" />
    </div>
  );
};

export default Chat;
