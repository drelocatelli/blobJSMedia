import { useNotification } from "js-media-package";
import { useEffect } from "react";

function Notifications() {

    const {requestNotifications, sendNotification} = useNotification();

    useEffect(() => {
        requestNotifications();
    }, []);

    return(
        <>
            <button type="button" onClick={() => sendNotification('Hello world!')}>Request notification</button>
        </>
    );
}

export {Notifications}; 