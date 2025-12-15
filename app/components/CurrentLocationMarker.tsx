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
        // Code 1: ユーザーが拒否した (PERMISSION_DENIED)
        // Code 2: 電波状況などで取得不可 (POSITION_UNAVAILABLE)
        // Code 3: タイムアウト (TIMEOUT)
        if (error.code === 1) {
          console.warn("位置情報の利用が許可されていません（マーカー非表示）");
          return;
        } else if (error.code === 2) {
          console.warn("位置情報が利用できない場所にいます（マーカー非表示）");
          return;
        } else if (error.code === 3) {
          console.warn("位置情報取得に時間がかかりすぎています（マーカー非表示）");
          return;
        } 
        console.error("位置情報取得エラー:", error.code, error.message);
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
