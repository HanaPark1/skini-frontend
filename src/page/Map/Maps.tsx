import { Map, MapMarker } from "react-kakao-maps-sdk";

const Maps = () => {

    const s_lat = 37.55465000468857;
    const s_lng = 126.97059787494679;

    return (
        <>
            <Map
                center={{ lat: s_lat, lng: s_lng }}
                style={{ width: "100%", height: "760px" }}
            >
                <MapMarker position={{ lat: s_lat, lng: s_lng }}>
                </MapMarker>
            </Map>
        </>
    );
};

export default Maps;