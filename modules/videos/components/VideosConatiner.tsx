import { useRef, useState, useEffect } from 'react';

import { motion } from 'framer-motion';
import { useStreams } from '@/common/context/peersContext';
import { useMyStream } from '@/common/context/streamContext.hooks';

import { useMovableVideos } from '../context/portableVideosContext';

import CustomVideo from './CustomVideo';

const VideosContainer = ({ active }: { active: boolean }) => {
  const myStream = useMyStream();

  const [selectedStream, setSelectedStream] = useState<MediaStream | null>(
    null
  );

  const streamContainer = useRef<HTMLDivElement>(null);
  const streams = useStreams();

  const { addMovableVideo, removeMovableVideo } = useMovableVideos();

  useEffect(() => {
    if (selectedStream) removeMovableVideo(selectedStream);
  }, [removeMovableVideo, selectedStream]);

  if (!myStream) return null;

  return (
    <div
      className={`absolute top-0 left-0 grid h-full w-full grid-cols-3 grid-rows-3 gap-1 p-1 ${
        active ? 'pointer-events-auto visible' : 'pointer-events-none invisible'
      }`}
    >
      {selectedStream && (
        <div
          className="absolute top-0 left-0 h-full w-full p-2"
          onClick={() => setSelectedStream(null)}
          ref={streamContainer}
        >
          <button
            className="btn btn-primary absolute bottom-full p-1 px-2 text-base"
            onClick={() => addMovableVideo(selectedStream)}
          >
            Закрепить видео
          </button>
          <CustomVideo stream={selectedStream} active />
          {selectedStream !== myStream && (
            <motion.div
              drag
              dragConstraints={streamContainer}
              className="absolute left-10 top-10 w-1/4 overflow-hidden rounded-3xl transition-none"
              onClick={(e) => e.stopPropagation()}
              dragElastic={0.2}
              dragTransition={{ power: 0.1, timeConstant: 100 }}
            >
              <CustomVideo stream={myStream} />
            </motion.div>
          )}
        </div>
      )}

      {!selectedStream && (
        <>
          {[myStream, ...Object.values(streams)].map((stream) => (
            <div
              key={stream.id}
              onClick={() => setSelectedStream(stream)}
              className="overflow-hidden rounded-xl"
            >
              <CustomVideo stream={stream} />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default VideosContainer;
