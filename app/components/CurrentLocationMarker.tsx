// app/components/CurrentLocationMarker.tsx
"use client";

import { useEffect, useState } from "react";

import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

// 赤いアイコンの定義（ここだけで使うので移動）
const currentUserIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export const CurrentLocationMarker = () => {
  const [currentPos, setCurrentPos] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPos([latitude, longitude]);
      },
      (error) => {
        console.error("位置情報エラー:", error.code, error.message);
      },
      {
        enableHighAccuracy: false, 
        timeout: 60000,
        maximumAge: 0,
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  // 取得できていない時は何も表示しない
  if (!currentPos) return null;

  return (
    <Marker position={currentPos} icon={currentUserIcon}>
      <Popup>現在地</Popup>
    </Marker>
  );
};
