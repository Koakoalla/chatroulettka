import VideosContainer from '@/modules/videos/components/VideosConatiner';
import UserSettings from './UserSettings';
import Users from './Users';
import Info from './Info';
import Chat from '@/modules/Room/components/Chat';

import MovableVideosProvider from '@/modules/videos/context/portableVideosContext';

import { BsChevronUp } from 'react-icons/bs';
import { useBoolean } from 'react-use';

const Room = () => {
  const [opened, setOpened] = useBoolean(false);
  const [showChat, setShowChat] = useBoolean(true);
  return (
    <div className="flex w-full flex-1 flex-col items-center">
      <MovableVideosProvider>
        <Info />
        <div className=" flex w-full flex-col space-y-5 px-5 sm:px-14 md:hidden">
          <div
            className={`${
              opened ? 'mt-3 max-h-[25rem]' : 'max-h-0'
            } flex flex-col space-y-5 overflow-hidden transition-all `}
          >
            <Users />
            <UserSettings />
          </div>
          <button
            className={`btn btn-primary w-max ${
              !opened && 'rotate-180'
            } self-center p-2`}
            onClick={() => setOpened(!opened)}
          >
            <BsChevronUp />
          </button>
        </div>

        <div className="mt-2 flex w-full grow flex-col md:flex-row 2xl:mt-16">
          <div className="hidden basis-1/4 md:block">
            <Users />
          </div>

          <div className="h-chat relative flex w-full justify-between px-0 sm:px-5 md:basis-1/2 md:px-0">
            <button
              className="btn btn-primary absolute right-0 bottom-full m-1 mr-5 bg-pink-400 px-2 py-1 text-base transition-none hover:bg-pink-500 active:bg-pink-400 md:mr-1"
              onClick={() => setShowChat(!showChat)}
            >
              Cпрятать
            </button>
            <span className="hidden h-full w-px bg-pink-600 md:block" />
            <Chat active={showChat} />
            <VideosContainer active={!showChat} />
            <span className="hidden h-full w-px bg-pink-600 md:block" />
          </div>

          <div className="hidden basis-1/4 md:block">
            <UserSettings />
          </div>
        </div>
      </MovableVideosProvider>
    </div>
  );
};

export default Room;
