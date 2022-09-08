import { ChangeEvent, useEffect, useState } from "react";

export interface FileUploadProps {
    fileExtension?: string;
    fileUrl?: string;
    fileType?: string;
    fileName?: string;
    sendFile: (changeState: ChangeEvent<HTMLInputElement>) => void;
    resetFile: () => void;
    base64File?: string;
}

function useFileUpload() : FileUploadProps {
    const [fileName, setFileName] = useState<string | undefined>(undefined);
    const [fileUrl, setFileUrl] = useState<string | undefined>(undefined);
    const [base64File, setBase64File] = useState(undefined);
    const [fileType, setFileType] = useState<string | undefined>(undefined);
    const [fileExtension, setFileExtension] = useState<string | undefined>(undefined);

    function sendFile(changeState: ChangeEvent<HTMLInputElement>) {
        const files = changeState.target.files;
        const fr = new FileReader();

        if(files) {
            blobToBase64(files[0]).then((result: any) => setBase64File(result));
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

    function blobToBase64(blob: Blob) {
        return new Promise((resolve, _) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(blob);
        });
    }

    function resetFile() {
        setFileUrl(undefined);
        setFileType(undefined);
        setFileExtension(undefined);
        setFileName(undefined);
    }

    return {fileExtension, fileUrl, base64File, fileType, sendFile, resetFile, fileName};
}

export {useFileUpload};