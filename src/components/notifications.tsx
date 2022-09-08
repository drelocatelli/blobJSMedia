import { useEffect } from "react";
import { useNotification } from "../hooks/useNotification";

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