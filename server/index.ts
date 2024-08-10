/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import { createServer } from 'http';

import express from 'express';
import next, { NextApiHandler } from 'next';
import { Server, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { v4 as uuidv4 } from 'uuid';

import {} from '../common/global';

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler: NextApiHandler = nextApp.getRequestHandler();

let queue: Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  DefaultEventsMap,
  SockedData
>[] = [];

let roomsCreated: string[] = [];

const generateId = (
    io: Server<
        ClientToServerEvents,
        ServerToClientEvents,
        DefaultEventsMap,
        SockedData
    >
): string => {
  let id = '';

  do {
    id = Math.random().toString(36).substr(2, 5);
  } while (io.sockets.adapter.rooms.has(id));

  return id;
};

const getRoomId = (
  socket: Socket<
    ClientToServerEvents,
    ServerToClientEvents,
    DefaultEventsMap,
    SockedData
  >
) => {
  const joinedRoom = [...socket.rooms].find((room) => room !== socket.id);

  if (!joinedRoom) return socket.id;

  return joinedRoom;
};

const getUser = (
  socket: Socket<
    ClientToServerEvents,
    ServerToClientEvents,
    DefaultEventsMap,
    SockedData
  >
): { name: string; id: string } => {
  return { name: socket.data.name || 'user', id: socket.id };
};

nextApp.prepare().then(async () => {
  const app = express();
  const server = createServer(app);
  const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    DefaultEventsMap,
    SockedData
  >(server);

  io.on('connection', (socket) => {
    const removeCreatedRoom = (roomId: string) => {
      if (!io.sockets.adapter.rooms.get(roomId))
        roomsCreated = roomsCreated.filter((arrRoomId) => arrRoomId !== roomId);
    };

    console.log('connection');

    // Добавляемся в очередь
    socket.on('join_new', ({ region, name }) => {
      console.log(region);

      socket.data.name = name;

      if (queue[0] && !queue.some((user) => user.id === socket.id)) {
        const roomId = generateId(io);
        console.log(roomId, 'private');

        const temp = [socket, queue[0]];
        temp.forEach((user) => user.join(roomId));

        const users = temp.map((user) => {
          return getUser(user);
        });

        io.to(roomId).emit('join_room', {
          type: 'private',
          id: roomId,
          users,
          colorsAssociated: new Map(),
        });

        queue = [...queue.slice(1, queue.length - 1)];
      } else if (!queue.some((user) => user.id === socket.id))
        queue.push(socket);
    });

    // Добавляемся в созданную комнату с ID
    socket.on('join_created', (roomId, name) => {
      if (!roomsCreated.includes(roomId)) return;

      socket.data.name = name;
      socket.join(roomId);

      const set = io.sockets.adapter.rooms.get(roomId);

      if (set === undefined) return;

      const users = [...set].map((socketId) => {
        const socketArr = io.sockets.sockets.get(socketId);

        if (socketArr) return getUser(socketArr);

        return { name: 'user', id: socketId };
      });

      io.to(roomId).emit('new_connection', getUser(socket));
      io.to(socket.id).emit('join_room', {
        type: 'public',
        id: roomId,
        users,
        colorsAssociated: new Map(),
      });
    });

    // Cоздание комнаты с ID
    socket.on('create_new', (name) => {
      const roomId = uuidv4();

      console.log(roomId, 'public');
      roomsCreated = [...roomsCreated, roomId];

      socket.data.name = name;
      socket.join(roomId);

      io.to(roomId).emit('join_room', {
        type: 'public',
        id: roomId,
        users: [getUser(socket)],
        colorsAssociated: new Map(),
      });
    });

    socket.on('check_room', (roomId) => {
      if (roomsCreated.includes(roomId)) {
        io.to(socket.id).emit('send_check', roomId);
      }
    });

    // Покидаем очередь
    socket.on('leave_queue', () => {
      queue = queue.filter((user) => user.id !== socket.id);
    });

    // Начинаем печатать
    socket.on('start_type', () => {
      const roomId = getRoomId(socket);

      socket.broadcast.to(roomId).emit('user_start_type', getUser(socket));
    });

    // Перестаем
    socket.on('stop_type', () => {
      const roomId = getRoomId(socket);

      socket.broadcast.to(roomId).emit('user_stop_type', getUser(socket));
    });

    // Отправляем сообщение
    socket.on('send_msg', (message) => {
      if (!message) return;

      const joinedRoom = getRoomId(socket);
      const id = generateId(io);

      io.to(joinedRoom).emit('new_msg', {
        message,
        author: getUser(socket),
        id,
      });
    });

    // Покидаем комнату
    socket.on('leave_room', () => {
      const joinedRoom = getRoomId(socket);

      if (joinedRoom === socket.id) return;

      socket.leave(joinedRoom);
      io.to(joinedRoom).emit('disconnected', getUser(socket));
      removeCreatedRoom(joinedRoom);
    });

    // Отправка сообщения дисконектнутому юзеру
    socket.on('disconnecting', () => {
      console.log('client disconnecting');

      queue = queue.filter((user) => user.id !== socket.id);

      const joinedRoom = getRoomId(socket);

      io.to(joinedRoom).emit('disconnected', getUser(socket));
      removeCreatedRoom(joinedRoom);
    });
  });

  app.all('*', (req: any, res: any) => nextHandler(req, res));

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
