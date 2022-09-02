import { ChangeEvent, useEffect, useState } from "react";

export interface FileUploadProps {
    fileExtension?: string;
    fileUrl?: string;
    fileType?: string;
    fileName?: string;
    sendFile: (changeState: ChangeEvent<HTMLInputElement>) => void;
    resetFile: () => void;
}

function useFileUpload() : FileUploadProps {
    const [fileName, setFileName] = useState<string | undefined>(undefined);
    const [fileUrl, setFileUrl] = useState<string | undefined>(undefined);
    const [fileType, setFileType] = useState<string | undefined>(undefined);
    const [fileExtension, setFileExtension] = useState<string | undefined>(undefined);

    function sendFile(changeState: ChangeEvent<HTMLInputElement>) {
        const files = changeState.target.files;
        const fr = new FileReader();

        if(files) {
            fr.readAsArrayBuffer(files[0]);
            fr.onload = () => {
                const blob = new Blob([fr.result!]);
                const url = URL.createObjectURL(blob);

                const extension = files[0].name.split('.').pop();
                const fileName = files[0].name.replace(/\.([^.]*)$/gm, '');
                const filterType = files[0].type.split('/')[0];
                const fileType = (filterType == 'application') ? files[0].type.split('/')[1]  : filterType;
                
                console.log('File type:', fileType);

                setFileName(fileName);
                setFileExtension(extension!);
                setFileType(fileType);
                setFileUrl(url);
            }
        }
    }

    function resetFile() {
        setFileUrl(undefined);
        setFileType(undefined);
        setFileExtension(undefined);
        setFileName(undefined);
    }

    return {fileExtension, fileUrl, fileType, sendFile, resetFile, fileName};
}

export {useFileUpload};