"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Map, Coffee } from "lucide-react"; // アイコンはお好みで

export const MapChange = ({ lat, lng, targetTime }: { lat: number, lng: number, targetTime: string }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 現在のページがマップモードかどうか判定
  const isMapMode = pathname.includes("/map");

  // 切り替え先のパスを決定
  const nextPath = isMapMode ? "/enjoy" : "/map";

  // 今のクエリパラメータ(?lat=...&time=...)をそのまま使う
  // searchParams.toString() で "lat=34...&lng=135...&time=1600" が取得できる
  const nextUrl = `${nextPath}?${searchParams.toString()}`;

  return (
    <div className="absolute top-4 left-4 z-[1000] bg-white p-3 rounded-lg shadow-md border border-gray-200 w-64">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h1 className="text-lg font-bold text-gray-800">Ψナラ</h1>
          <p className="text-sm font-bold text-red-500">
            リミット: {targetTime.slice(0, 2)}:{targetTime.slice(2, 4)}
          </p>
        </div>
      </div>

      {/* 切り替えボタン */}
      <Link
        href={nextUrl}
        className={`
          flex items-center justify-center gap-2 w-full py-2 px-3 rounded-md text-sm font-bold transition-colors
          ${isMapMode 
            ? "bg-red-100 text-red-700 hover:bg-red-200" // Mapページにいる時（Enjoyへ誘導）
            : "bg-green-100 text-green-700 hover:bg-green-200"       // Enjoyページにいる時（Mapへ誘導）
          }
        `}
      >
        {isMapMode ? (
          <>
            <Map size={16} />
            散策モードへ切り替え
          </>
        ) : (
          <>
            <Coffee size={16} />
            休憩モードへ切り替え
          </>
        )}
      </Link>
    </div>
  );
};
