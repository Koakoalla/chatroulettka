import { useStreamSetters } from '@/common/context/streamContext.hooks';
const btnClass = 'btn btn-secondary w-36 px-0 text-center font-normal';

const active = 'bg-green-400 text-black hover:bg-green-500 active:bg-green-400';
const UserSettings = () => {
  const {
    isScreenStreaming,
    isVideoStreaming,
    isAudioStreaming,
    handleScreenStreaming,
    handleVideoStreaming,
    handleAudioStreaming,
  } = useStreamSetters();

  return (
    <div className="flex flex-1 flex-col items-center space-y-3">
      <h3 className="-mb-2 text-center text-xl font-bold">🤓</h3>
      <button className={`${btnClass}`}>Отправить мем</button>
      <button
        className={`${btnClass} ${isAudioStreaming && active}`}
        onClick={handleAudioStreaming}
      >
        Поговорить по аудио
      </button>
      <button
        className={`${btnClass} ${isScreenStreaming && active}`}
        onClick={handleScreenStreaming}
      >
        Шерить экран
      </button>
      <button
        className={`${btnClass} ${isVideoStreaming && active}`}
        onClick={handleVideoStreaming}
      >
        Поговорить по видео
      </button>
    </div>
  );
};

export default UserSettings;
