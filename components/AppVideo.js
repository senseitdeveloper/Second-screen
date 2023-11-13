import React, { useRef } from 'react';
import { Video } from 'expo-av';

function AppVideo({ file, style, resize }) {
    // const video = useRef(null);
    return (
        <Video
            // ref={video}
            style={style}
            resizeMode={resize}
            // source={{uri: assets.queen_uri}}
            source={file}
            isLooping
            shouldPlay
        />
    );
}

export default AppVideo;