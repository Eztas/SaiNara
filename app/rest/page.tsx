// app/rest/page.tsx
"use client";

// 普通のimportではなく、dynamic importを使うのが鉄則
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

import { MapChange } from "@/components/MapChange";
import { parseCoords, parseTime } from "@/lib/validation";

// 地図コンポーネント（ssr: falseでSSR無効化）
const BaseMap = dynamic(() => import("@/components/map/BaseMap"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <p className="text-xl font-bold animate-pulse">地図を読み込んでいます...</p>
    </div>
  ),
});

const RestMap = dynamic(
  () => import("@/components/map/RestMap").then((mod) => mod.RestMap),
  { ssr: false }
);

// URLパラメータ取得用のコンポーネント
function MapContent() {
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

  return (
    <>
      <BaseMap>
        <RestMap />
      </BaseMap>
      <MapChange targetTime={targetTime} />
    </>
  );
}

// メインページ
export default function MapPage() {
  return (
    <main className="relative w-full h-[100dvh]">
      <Suspense fallback={<div>Loading Condition...</div>}>
        <MapContent />
      </Suspense>
    </main>
  );
}
