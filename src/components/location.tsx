import { useLocation } from "../hooks/useLocation";
import Render from "./render";

function Location() {

    const {requestLocation, location} = useLocation();

    return(
        <>
            <button type="button" onClick={requestLocation}>Request location</button>
            <br /><br />
            <Render condition={location != undefined}>
                Latitude: {location?.coords.latitude} <br />
                Longitude: {location?.coords.longitude}
            </Render>
        </>
    );

}

export {Location};