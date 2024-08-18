import { createContext, useContext, useEffect } from 'react';

import { useList } from 'react-use';

import { useMyStream } from '@/common/context/streamContext.hooks';

import PortableVideo from '../components/PortableVideo';

export const portableVideosContext = createContext<{
    isAlreadyMovable: (stream: MediaStream) => boolean;
    addMovableVideo: (stream: MediaStream) => void;
    removeMovableVideo: (stream: MediaStream) => void;
}>({
    isAlreadyMovable: () => false,
    addMovableVideo: () => {},
    removeMovableVideo: () => {},
});

export const useMovableVideos = () => {
    const { isAlreadyMovable, addMovableVideo, removeMovableVideo } =
        useContext(portableVideosContext);

    return { isAlreadyMovable, addMovableVideo, removeMovableVideo };
};

const MovableVideosProvider = ({
                                   children,
                               }: {
    children: JSX.Element[] | JSX.Element;
}) => {
    const myStream = useMyStream();

    const [movableVideos, movableVideosHandler] = useList<MediaStream>();

    useEffect(() => {
        if (!myStream) return;

        if (myStream.getVideoTracks()[0]) {
            if (!movableVideos.includes(myStream))
                movableVideosHandler.push(myStream);
        } else {
            const tempIndex = movableVideos.indexOf(myStream);
            if (tempIndex > -1) movableVideosHandler.removeAt(tempIndex);
        }
    }, [movableVideos, movableVideosHandler, myStream]);

    useEffect(() => {
        movableVideos.forEach((stream) => {
            if (
                stream.getVideoTracks()[0].readyState === 'ended' ||
                stream.getVideoTracks()[0].muted
            ) {
                const tempIndex = movableVideos.indexOf(stream);

                if (tempIndex > -1) movableVideosHandler.removeAt(tempIndex);
            }
        });
    }, [movableVideos, movableVideosHandler, myStream]);

    const isAlreadyMovable = (stream: MediaStream) =>
        movableVideos.some((arrStream) => arrStream === stream);

    const addMovableVideo = (stream: MediaStream) => {
        if (!movableVideos.includes(stream)) movableVideosHandler.push(stream);
    };

    const removeMovableVideo = (stream: MediaStream) => {
        const tempIndex = movableVideos.indexOf(stream);

        if (tempIndex > -1) movableVideosHandler.removeAt(tempIndex);
    };

    return (
        <portableVideosContext.Provider
            value={{ isAlreadyMovable, addMovableVideo, removeMovableVideo }}
        >
            {movableVideos.map((stream) => {
                return (
                    <PortableVideo
                        stream={stream}
                        key={stream.id}
                        mine={stream === myStream}
                    />
                );
            })}

            {children}
        </portableVideosContext.Provider>
    );
};

export default MovableVideosProvider;