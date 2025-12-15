// app/components/ManualLocationMarker.tsx
"use client";

import { useState, useRef, useMemo } from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

// 青いアイコンの定義（ここだけで使うので移動）
const manualLocationIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// 初期位置（奈良市）
const INITIAL_POSITION: [number, number] = [34.6837, 135.8277];

export const ManualLocationMarker = () => {
  const [position, setPosition] = useState<[number, number]>(INITIAL_POSITION);
  const markerRef = useRef<L.Marker>(null);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker) {
          const { lat, lng } = marker.getLatLng();
          setPosition([lat, lng]);
          console.log(`Manual Position: [${lat}, ${lng}]`);
        }
      },
    }),
    []
  );

  return (
    <Marker
      draggable={true} // 常にドラッグ可能
      eventHandlers={eventHandlers}
      position={position}
      icon={manualLocationIcon}
      ref={markerRef}
    >
      <Popup>
        手動モード<br />
        ドラッグで移動可能
      </Popup>
    </Marker>
  );
};
