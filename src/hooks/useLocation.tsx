import { useState } from "react";

export interface LocationProps {
    requestLocation: () => void;
    location?: GeolocationPosition;
}

function useLocation() : LocationProps {
    const [location, setLocation] = useState<GeolocationPosition | undefined>(undefined);

    function requestLocation() {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => setLocation(position));
        }
    }

    return {location, requestLocation};

}

export {useLocation};