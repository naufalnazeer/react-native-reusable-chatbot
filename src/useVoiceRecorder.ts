import { createSound } from 'react-native-nitro-sound';
import { useRef, useState } from 'react';

export const useVoiceRecorder = () => {
    const recorder = useRef(createSound()).current;
    const [recording, setRecording] = useState(false);

    const startRecording = async () => {
        const path = 'audio.mp4';
        await recorder.startRecorder(path);
        setRecording(true);
    };

    const stopRecording = async () => {
        const result = await recorder.stopRecorder();
        setRecording(false);
        return result;
    };

    return { recording, startRecording, stopRecording };
};