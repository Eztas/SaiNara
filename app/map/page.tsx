// app/map/page.tsx
"use client";

// 普通のimportではなく、dynamic importを使うのが鉄則
import dynamic from "next/dynamic";

// ここでコンポーネントを読み込む（ssr: false が超重要）
const MapComponent = dynamic(() => import("@/app/components/MapComponent"), {
  ssr: false, // サーバーサイドレンダリングを無効化
  loading: () => (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <p className="text-xl font-bold animate-pulse">地図を読み込んでいます...</p>
    </div>
  ),
});

export default function MapPage() {
  return (
    <main className="relative w-full h-screen">
      {/* 画面いっぱいに地図を表示 */}
      <MapComponent />

      {/* 地図の上に重ねるUI（戻るボタンなど） */}
      <div className="absolute top-4 left-4 z-[1000] bg-white p-3 rounded-lg shadow-md border border-gray-200">
        <h1 className="text-lg font-bold text-gray-800">Ψなら (Beta)</h1>
        <p className="text-xs text-gray-500">現在地周辺マップ</p>
      </div>
    </main>
  );
}
