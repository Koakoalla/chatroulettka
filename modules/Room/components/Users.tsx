import Label from '@/common/components/Label';
import { useRoom } from '@/common/context/storeContext';

const Users = () => {
  const room = useRoom();

  return (
    <div className="flex flex-col items-start md:items-center">
      <h3 className="-mb-1 block text-center text-xl font-bold md:hidden">
        В чате сейчас
      </h3>
      <div className="flex flex-wrap items-start space-y-2 space-x-3 md:flex-col md:space-x-0">
        <h3 className="-mb-1 hidden text-center text-xl font-bold md:block">
          В чате сейчас
        </h3>
        {room.users.map((user) => {
          const color =
            Array.from(room.colorsAssociated).length === 0
              ? 'blue'
              : room.colorsAssociated.get(user.id) || 'blue';

          return (
            <Label color={color} key={user.id}>
              {user.name}
            </Label>
          );
        })}
      </div>
    </div>
  );
};

export default Users;
