// app/components/MapComponent.tsx
"use client";

import { useEffect, useState } from "react";

import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Layers } from "lucide-react";

import { CurrentLocationMarker } from "@/components/marker/CurrentLocationMarker";
import { DestinationMarker } from "@/components/marker/DestinationMarker";
import { ManualLocationMarker } from "@/components/marker/ManualLocationMarker";
import { NaraFreeWiFiMarkers } from "@/components/marker/rest/NaraFreeWiFiMarkers";
import { NaraFreeSeatingMarkers } from "@/components/marker/rest/NaraFreeSeatingMarkers";
import { NaraPowerCafeMarkers } from "@/components/marker/rest/NaraPowerCafeMarkers"
import { TimeLimitCircle } from "@/components/TimeLimitCircle";
import { MarkersFilter, FilterState } from "@/components/MarkersFilter";

// Propsの型定義
type MapComponentProps = {
  lat: number;
  lng: number;
  targetTime: string; // "1430" 形式
};

// Leafletのアイコンバグ修正
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

const MapComponent = ({ lat, lng, targetTime }: MapComponentProps) => {
  const destinationPos: [number, number] = [lat, lng];

  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    wifi: true,
    power: true,
    seating: true,
  });

  const toggleFilter = (key: keyof FilterState) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

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
      
      {/* OpenStreetMapのタイル使用時の番号とズーム値, クレジット, leaflet側でユーザー操作に合わせて動的に変更できる */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {process.env.NEXT_PUBLIC_IS_MANUAL === "true" ? (
        <ManualLocationMarker />
      ) : (
        <CurrentLocationMarker />
      )}

      {/* 目的地マーカー */}
      <DestinationMarker position={destinationPos} targetTime={targetTime}/>

      {filters.wifi && <NaraFreeWiFiMarkers />}
      {filters.power && <NaraPowerCafeMarkers />}
      {filters.seating && <NaraFreeSeatingMarkers />}

      <button
        onClick={() => setShowFilter(!showFilter)}
        className="absolute bottom-6 right-4 z-[1000] w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors border border-gray-200"
        aria-label="地図フィルターを開く"
      >
        <Layers size={24} />
      </button>

      {showFilter && (
        <MarkersFilter
          filters={filters}
          onToggle={toggleFilter}
          onClose={() => setShowFilter(false)}
        />
      )}

      {/* 緯度経度と時間で変動するサークル */}
      <TimeLimitCircle center={destinationPos} targetTime={targetTime} />

    </MapContainer>
  );
};

export default MapComponent;
