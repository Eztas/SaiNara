// app/components/MapComponent.tsx
"use client";

import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";

const MapComponent = () => {
  // 近鉄奈良駅の座標
  const NARA_STATION: [number, number] = [34.6844, 135.8268];

  // ▼ ここが修正ポイント！
  // コンポーネントが読み込まれた時に、アイコンの画像の場所をCDN（ネット上のURL）に強制的に書き換える
  useEffect(() => {
    // Leafletのデフォルトアイコンパス設定を一度削除（これがないとエラーになる）
    // @ts-ignore
    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
      iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    });
  }, []);
  // ▲ 修正ポイント終了

  return (
    <MapContainer
      center={NARA_STATION}
      zoom={19}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* 円（結界） */}
      <Circle
        center={NARA_STATION}
        radius={500}
        pathOptions={{
          color: "blue",
          fillColor: "#00f",
          fillOpacity: 0.1,
        }}
      />

      {/* マーカー */}
      <Marker position={NARA_STATION}>
        <Popup>近鉄奈良駅（ゴール）</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
