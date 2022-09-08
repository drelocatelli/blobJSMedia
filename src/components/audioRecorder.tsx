import { useAudioRecorder } from "js-media-package";
import { useEffect, useRef } from "react";

function AudioRecorder() {

    const {audioURL, isStopped, isRecording, startRecording, stopRecording} = useAudioRecorder();
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if(isStopped && audioRef.current) audioRef.current.play();
    }, [isStopped]);

    return(
        <>
            Audio Recorder <br />
            {audioURL != undefined && ( <audio src={audioURL} ref={audioRef} controls></audio> )}
            <br />
            {!isRecording && ( <button type="button" onClick={startRecording}>Gravar</button> )}
            {isRecording && ( <button type="button" onClick={stopRecording}>Parar</button> )}
        </>
    );
}

export {AudioRecorder};