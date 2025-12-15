"use client";

import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

// 赤いアイコン (目的地用)
const destinationIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

type DestinationMarkerProps = {
  position: [number, number];
  targetTime: string;
};

export const DestinationMarker = ({ position, targetTime }: DestinationMarkerProps) => {
  return (
    <Marker position={position} icon={destinationIcon}>
      <Popup>
        <div className="text-center">
          <strong>目的地</strong>
          <br />
          リミット: {targetTime.slice(0, 2)}:{targetTime.slice(2, 4)}
        </div>
      </Popup>
    </Marker>
  );
};
