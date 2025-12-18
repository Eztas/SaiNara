// app/components/BaseMap.tsx
"use client";

import { useEffect, useMemo, ReactNode } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import { CurrentLocationMarker } from "@/components/marker/CurrentLocationMarker";
import { DestinationMarker } from "@/components/marker/DestinationMarker";
import { ManualLocationMarker } from "@/components/marker/ManualLocationMarker";
import { TimeLimitCircle } from "@/components/TimeLimitCircle";

// Props: 緯度経度・時間・そして「中身(children)」を受け取る
type BaseMapProps = {
  lat: number;
  lng: number;
  targetTime: string;
  children?: ReactNode; // ここにモード別のマーカーやUIが入る
};

// アイコン修正ロジック
const fixLeafletIcon = () => {
  // @ts-ignore
  delete L.Icon.Default.prototype._getIconUrl;
  // デフォルトの画像パス読み込みを削除し、CDN上の画像URLを取得
  // 「マーカー画像が表示されず壊れる」という有名なバグを直す
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  });
}; 

// 地図の中心を強制的に移動させるためのコンポーネント
// (MapContainerのcenterプロパティだけでは再描画時に動かないことがあるため)
const MapUpdater = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, map.getZoom()); // 現在のzoom値に合わせてマップをレンダリング
  }, [center, map]);
  return null;
};

const BaseMap = ({ lat, lng, targetTime, children }: BaseMapProps) => {
  const destinationPos = useMemo<[number, number]>(() => [lat, lng], [lat, lng]);

  useEffect(() => {
    fixLeafletIcon();
  }, []);

  return (
    <MapContainer
      center={destinationPos}
      zoom={16}
      style={{ width: "100%", height: "100%" }}
    >
      <MapUpdater center={destinationPos} />
      
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* 現在地マーカー分岐 */}
      {process.env.NEXT_PUBLIC_IS_MANUAL === "true" ? (
        <ManualLocationMarker />
      ) : (
        <CurrentLocationMarker />
      )}

      {/* 目的地マーカー & 制限時間サークル */}
      <DestinationMarker position={destinationPos} targetTime={targetTime}/>
      <TimeLimitCircle center={destinationPos} targetTime={targetTime} />

      {/* マップごとに用意したマーカーを掲載 */}
      {children}

    </MapContainer>
  );
};

export default BaseMap;
