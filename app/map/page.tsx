// app/map/page.tsx
"use client";

// 普通のimportではなく、dynamic importを使うのが鉄則
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

// 地図コンポーネント（ssr: falseでSSR無効化）
const MapComponent = dynamic(() => import("@/components/MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <p className="text-xl font-bold animate-pulse">地図を読み込んでいます...</p>
    </div>
  ),
});

// URLパラメータ取得用のコンポーネント
function MapContent() {
  const searchParams = useSearchParams();

  // URLパラメータを取得（なければデフォルト値を設定）
  // 例: /map?lat=34.6841376&lng=135.8285414&time=1830
  const latParam = searchParams.get("lat");
  const lngParam = searchParams.get("lng");
  const timeParam = searchParams.get("time");

  // デフォルト: 近鉄奈良駅
  const lat = latParam ? parseFloat(latParam) : 34.6841376;
  const lng = lngParam ? parseFloat(lngParam) : 135.8285414;
  
  // デフォルト: "1800" (18:00)
  const targetTime = timeParam || "1800";

  return (
    <>
      <MapComponent lat={lat} lng={lng} targetTime={targetTime} />
      
      {/* UIパーツ */}
      <div className="absolute top-4 left-4 z-[1000] bg-white p-3 rounded-lg shadow-md border border-gray-200">
        <h1 className="text-lg font-bold text-gray-800">Ψなら (Beta)</h1>
        <p className="text-xs text-gray-500">
          目的地: {lat.toFixed(4)}, {lng.toFixed(4)}<br/>
          リミット: {targetTime.slice(0, 2)}:{targetTime.slice(2, 4)}
        </p>
      </div>
    </>
  );
}

// メインページ
export default function MapPage() {
  return (
    <main className="relative w-full h-screen">
      <Suspense fallback={<div>Loading Condition...</div>}>
        <MapContent />
      </Suspense>
    </main>
  );
}
