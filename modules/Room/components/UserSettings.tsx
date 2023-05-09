const btnClass = 'btn btn-secondary w-36 px-0 text-center font-normal';

const UserSettings = () => {
  return (
    <div className="flex flex-1 flex-col items-center space-y-3">
      <h3 className="-mb-2 text-center text-xl font-bold">🤓</h3>
      <button className={`${btnClass}`}>Отправить мем</button>
    </div>
  );
};

export default UserSettings;
