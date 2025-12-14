// app/components/MapComponent.tsx
"use client";

import { useEffect, useState } from "react";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import { TimeLimitCircle } from "@/app/components/TimeLimitCircle";

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

// ▼ 現在地用の赤いアイコンを定義
const currentUserIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

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
  const centerPos: [number, number] = [lat, lng];

  // ▼ 現在地の座標を管理するState
  const [currentPos, setCurrentPos] = useState<[number, number] | null>(null);

  useEffect(() => {
    fixLeafletIcon();

    // 現在地を監視して取得する処理
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      return;
    }

    // watchPosition: 移動するたびに位置情報を更新
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPos([latitude, longitude]);
      },
      (error) => {
        console.error(
          "位置情報エラー詳細:",
          "Code:", error.code,
          "Message:", error.message
        );
      },
      {
        enableHighAccuracy: true, // 高精度モード（GPS優先）
        timeout: 60000,
        maximumAge: 0,
      }
    );

    // クリーンアップ関数（コンポーネントが消える時に監視を停止）
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return (
    <MapContainer
      center={centerPos}
      zoom={16}
      style={{ width: "100%", height: "100%" }}
    >
      <MapUpdater center={centerPos} />
      
      {/* OpenStreetMapのタイル使用時の番号とズーム値, クレジット, leaflet側でユーザー操作に合わせて動的に変更できる */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* 緯度経度と時間で変動するサークル */}
      <TimeLimitCircle center={centerPos} targetTime={targetTime} />

      {/* 目的地マーカー */}
      <Marker position={centerPos}>
        <Popup>
          目的地<br />
          リミット: {targetTime.slice(0, 2)}:{targetTime.slice(2, 4)}
        </Popup>
      </Marker>

      {/* ▼ 現在地マーカー（赤：カスタムアイコン） */}
      {currentPos && (
        <Marker position={currentPos} icon={currentUserIcon}>
          <Popup>現在地</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default MapComponent;
