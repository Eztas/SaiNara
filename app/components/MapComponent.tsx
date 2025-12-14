// app/components/MapComponent.tsx
"use client";

import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";

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
  const centerPos: [number, number] = [lat, lng];
  const [radius, setRadius] = useState(500); // デフォルト半径

  useEffect(() => {
    fixLeafletIcon();
  }, []);

  // 時間から半径を計算するロジック
  useEffect(() => {
    // ターゲット時刻をDateオブジェクトにする
    const now = new Date();
    const target = new Date();
    const hours = parseInt(targetTime.slice(0, 2), 10);
    const minutes = parseInt(targetTime.slice(2, 4), 10);
    
    target.setHours(hours, minutes, 0, 0);

    const diffSeconds = (target.getTime() - now.getTime()) / 1000;
    if (diffSeconds > 0) {
      const remainingMinutes = diffSeconds / 60;
      const calcRadius = remainingMinutes * 20; 
      setRadius(calcRadius); // 最低50mは確保
    } else {
      setRadius(0); // 時間切れ
    }
  }, [targetTime]); // targetTimeが変わるたびに再計算

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

      {/* 結界（円） */}
      <Circle
        center={centerPos}
        radius={radius}
        pathOptions={{
          color: "blue",
          fillColor: "#00f",
          fillOpacity: 0.1,
        }}
      />

      {/* 目的地マーカー */}
      <Marker position={centerPos}>
        <Popup>
          目的地<br />
          リミット: {targetTime.slice(0, 2)}:{targetTime.slice(2, 4)}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
