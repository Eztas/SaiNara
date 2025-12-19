// components/map/BaseMap.tsx
"use client";

import { useEffect, useMemo, ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import { CurrentLocationMarker } from "@/components/marker/CurrentLocationMarker";
import { DestinationMarker } from "@/components/marker/DestinationMarker";
import { ManualLocationMarker } from "@/components/marker/ManualLocationMarker";
import { TimeLimitCircle } from "@/components/TimeLimitCircle";

import { parseCoords, parseTime } from "@/lib/validation"

// Props: 緯度経度・時間・そして「中身(children)」を受け取る
type BaseMapProps = {
  center ?: [number, number]; // 中心座標（省略時はURLパラメータから取得）
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

const BaseMap = ({ center, children }: BaseMapProps) => {
  const searchParams = useSearchParams();

  // URLパラメータを取得（なければデフォルト値を設定）
  // 例: /map?lat=34.6841376&lng=135.8285414&time=1830
  const latParam = searchParams.get("lat");
  const lngParam = searchParams.get("lng");
  const timeParam = searchParams.get("time");

  // デフォルト: 近鉄奈良駅
  const lat = parseCoords(latParam, 34.6841376);
  const lng = parseCoords(lngParam, 135.8285414);
  
  // デフォルト: "1800" (18:00)
  const targetTime = parseTime(timeParam, "1800");
  const destinationPos = useMemo<[number, number]>(() => [lat, lng], [lat, lng]);

  const mapCenter = center || destinationPos;

  useEffect(() => {
    fixLeafletIcon();
  }, []);

  return (
    <MapContainer
      center={mapCenter}
      zoom={16}
      style={{ width: "100%", height: "100%" }}
    >
      <MapUpdater center={mapCenter} />
      
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
