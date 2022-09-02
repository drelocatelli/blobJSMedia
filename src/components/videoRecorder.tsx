import { useEffect, useRef } from "react";
import { useVideoRecorder } from "../hooks/useVideoRecorder";

function VideoRecorder() {

    const {videoURL, isStopped, isRecording, startRecording, stopRecording, Stream} = useVideoRecorder();
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if(videoRef.current) {
            Stream(videoRef.current);
        }
    }, [isStopped, isRecording]);

    return(
        <>
            Video Recorder <br />
            <video ref={videoRef} src={videoURL} controls></video>
            <br />
            {!isRecording && ( <button type="button" onClick={startRecording}>Gravar</button> )}
            {isRecording && ( <button type="button" onClick={stopRecording}>Parar</button> )}
        </>
    );
}

export {VideoRecorder};