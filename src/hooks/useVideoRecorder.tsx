import { useEffect, useState } from "react";

export interface VideoRecorder {
    videoURL?: string;
    isRecording: boolean;
    isStopped: boolean;
    startRecording: () => void;
    stopRecording: () => void;
    Stream: (element: HTMLVideoElement) => void;
}

function useVideoRecorder() : VideoRecorder {
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [videoURL, setvideoURL] = useState<string | undefined>(undefined);
    const [recorder, setRecorder] = useState<MediaRecorder | null>(null);
    const [isStopped, setIsStopped] = useState<boolean>(false);

    useEffect(() => {
        if(recorder === null) {
            if(isRecording) {
                requestRecorder().then(stream => setRecorder(new MediaRecorder(stream)), console.error);
            }
            return;
        }

        if(isRecording) {
            recorder.start();
        } else {
            recorder.stop();
        }

        // obtain video data
        const handleData = (e : {data: any}) => {
            const blob = URL.createObjectURL(e.data);
            setvideoURL(blob);
        };
        recorder.addEventListener('dataavailable', handleData);
        return () => recorder.removeEventListener('dataavailable', handleData);
    }, [recorder, isRecording]);

    function startRecording() {
        setIsRecording(true);
        setIsStopped(false);
    }

    function stopRecording() {
        setIsRecording(false);
        setTimeout(() => setIsStopped(true), 100);
    }

    function Stream(element: HTMLVideoElement) {
        element.autoplay = true;
        requestRecorder().then(stream => {
            if(isStopped) {
                return element.srcObject = null;
            }
            if(isRecording) {
                element.srcObject = stream;
            }
        })
    }

    async function requestRecorder() {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        return stream;
    }

    return {videoURL, isRecording, isStopped, Stream, startRecording, stopRecording};
}


export {useVideoRecorder};