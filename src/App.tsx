import { AudioRecorder } from "./components/audioRecorder";
import { FileUploader } from "./components/fileUpload";
import { Location } from "./components/location";
import { VideoRecorder } from "./components/videoRecorder";

function App() {

  return (
    <>
      <div style={{textAlign: 'center', fontSize: '28px', padding: '1rem', background: '#000', color: '#fff', marginBottom: '2rem'}}>
        Blob Project JS
      </div>
      <Content />
    </>
  );
  
}

function Content() {
  return(
    <>
      <div style={{textAlign: 'center'}}>
        <AudioRecorder />
        <br /><br />
        <FileUploader />
        <br /><br />
        <VideoRecorder />
        <br /><br />
        <Location />
      </div>
    </>
  );
}

export default App
