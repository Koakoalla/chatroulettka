import Label from '@/common/components/Label';
import { useRoom } from '@/common/context/storeContext';

const Users = () => {
  const room = useRoom();

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-start space-y-2">
        <h3 className="-mb-1 text-center text-xl font-bold">В чате сейчас</h3>
        {room.users.map((user) => (
          <Label
            color={room.colorsAssociated.get(user.id) || 'blue'}
            key={user.id}
          >
            {user.name}
          </Label>
        ))}
      </div>
    </div>
  );
};

export default Users;