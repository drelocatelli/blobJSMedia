import { useState } from "react";

interface NotificationProps {
    requestNotifications: () => void;
    sendNotification: (text: string, options?: NotificationOptions) => void;
}

function useNotification() : NotificationProps {
    const [isPermitted, setIsPermitted] = useState<boolean>(false);

    async function requestNotifications() {
        const permission = await Notification.requestPermission();

        if(permission == 'granted') setIsPermitted(true);
    }

    function sendNotification(text: string, options?: NotificationOptions) {
        if(isPermitted) {
            new Notification(text, options);
        } else {
            requestNotifications();
        }
    }

    return {requestNotifications, sendNotification};
    
}

export {useNotification}