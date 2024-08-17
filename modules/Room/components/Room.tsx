// import Chat from './Chat';
import VideosContainer from '@/modules/videos/components/VideosConatiner';
import UserSettings from './UserSettings';
import Users from './Users';
import Info from './Info';

import { BsChevronUp } from 'react-icons/bs';
import { useBoolean } from 'react-use';

const Room = () => {
  const [opened, setOpened] = useBoolean(false);
  return (
    <div className="flex w-full flex-1 flex-col items-center">
      <Info />
      <div className=" flex w-full flex-col space-y-5 px-5 sm:px-14 md:hidden">
        <div
          className={`${
            opened ? 'mt-3 max-h-[25rem]' : 'max-h-0'
          } flex flex-col space-y-5 overflow-hidden transition-all `}
        >
          <Users />
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

      <div className="mt-2 flex w-full grow flex-col md:mt-16 md:flex-row">
        <div className="hidden basis-1/4 md:block">
          <Users />
        </div>

        <div className="h-chat flex w-full px-0 sm:px-5 md:basis-1/2 md:px-0">
          <span className="hidden h-full w-px bg-zinc-600 md:block" />
          <VideosContainer />
          <span className="hidden h-full w-px bg-zinc-600 md:block" />
        </div>

        <div className="hidden basis-1/4 md:block">
          <UserSettings />
        </div>
      </div>
    </div>
  );
};

export default Room;
