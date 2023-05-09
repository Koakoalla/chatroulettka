import Chat from './Chat';
import UserSettings from './UserSettings';
import Users from './Users';
import Info from './Info';

const Room = () => {
  return (
    <div className="flex w-full flex-1 flex-col items-center">
      <Info/>
      <div className="mt-16 flex w-full grow flex-row">
        <div className="basis-1/4">
          <Users/>
        </div>
        <div className="basis-1/2">
          <Chat />
        </div>
        <div className="basis-1/4">
          <UserSettings/>
        </div>
      </div>
    </div>
  );
};

export default Room;