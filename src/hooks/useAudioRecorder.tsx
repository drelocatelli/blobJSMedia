import { useEffect, useState } from "react";

export interface AudioRecorder {
    audioURL?: string;
    isRecording: boolean;
    isStopped: boolean;
    startRecording: () => void;
    stopRecording: () => void;
    base64Audio?: string;
}

function useAudioRecorder() : AudioRecorder {
    const [audioURL, setAudioURL] = useState<string | undefined>(undefined);
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [recorder, setRecorder] = useState<MediaRecorder | null>(null);
    const [isStopped, setIsStopped] = useState<boolean>(false);
    const [base64Audio, setBase64Audio] = useState(undefined);

    useEffect(() => {
        if(recorder === null) {
            if(isRecording) {
                requestRecorder().then(setRecorder, console.error);
            }
            return;
        }

        if(isRecording) {
            recorder.start();
        } else {
            recorder.stop();
        }

        // obtain audio data
        const handleData = (e : {data: any}) => {
            const blob = URL.createObjectURL(e.data);
            setAudioURL(blob);
            blobToBase64(e.data).then((result: any) => setBase64Audio(result));
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

    function blobToBase64(blob: Blob) {
        return new Promise((resolve, _) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(blob);
        });
    }

    return {audioURL, isRecording, base64Audio, isStopped, startRecording, stopRecording};
}

async function requestRecorder() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    return new MediaRecorder(stream);
}

export {useAudioRecorder};