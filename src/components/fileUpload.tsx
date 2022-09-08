import { useFileUpload } from "js-media-package";

function FileUploader() {
    const { fileUrl, sendFile, fileExtension, resetFile, fileType, fileName } = useFileUpload();

    return (
        <>
            File uploader <br />
            <input type="file" onChange={sendFile} />
            <button type="button" onClick={resetFile}>
                Cancelar
            </button>
            <br />
            <FileDetails />
        </>
    );

    function FileDetails() {
        return (
            <>
                {fileUrl != undefined && (
                    <>
                        File extension: {fileExtension} <br />
                        File Type: {fileType} <br />
                        Preview: <br />
                        <FilePreview />
                    </>
                )}
            </>
        );
    }

    function FilePreview() {
        switch(fileType) {
            case 'image': 
                return <img src={fileUrl} style={{maxWidth: '200px'}} />
            default:
                return <>{fileName}.{fileExtension}</>;
        }
    }
}

export { FileUploader };
