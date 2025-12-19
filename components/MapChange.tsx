"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Map, Coffee } from "lucide-react";

type ModeToggleProps = {
  isEnjoyMode: boolean; // 名前変更: trueなら散策(enjoy)、falseなら休憩(map)
  nextUrl: string;
};

// トグルボタンのデザイン
export const ModeToggle = ({ isEnjoyMode, nextUrl }: ModeToggleProps) => {
  return (
    <Link href={nextUrl} className="relative inline-flex items-center cursor-pointer group shrink-0">
      {/* 1. トグルの背景 */}
      <div
        className={`
          w-14 h-7 rounded-full transition-colors duration-300 ease-in-out shadow-inner relative
          ${isEnjoyMode ? "bg-red-400" : "bg-green-500"} 
        `}
      >
      </div>

      {/* 2. 動く丸（ノブ） */}
      <div
        className={`
          absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md 
          transform transition-transform duration-300 ease-in-out flex items-center justify-center
          ${isEnjoyMode ? "translate-x-7" : "translate-x-0"}
        `}
      >
        {/* アイコンの出し分け */}
        {isEnjoyMode ? (
          <Map size={12} className="text-red-500" />
        ) : (
          <Coffee size={12} className="text-green-600" />
        )}
      </div>
    </Link>
  );
};

export const MapChange = ({ targetTime }: { targetTime: string }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // ★修正ポイント: "/enjoy" が含まれているかを基準にする
  // これにより、/enjoy の時に true (散策モード) になります
  const isEnjoyMode = pathname.includes("/enjoy");

  // 切り替え先: enjoyならmapへ、そうでなければenjoyへ
  const nextPath = isEnjoyMode ? "/map" : "/enjoy";
  const nextUrl = `${nextPath}?${searchParams.toString()}`;

  return (
    // ★レイアウト修正: w-64をやめて横並びにし、空白を削除
    <div className="absolute top-4 left-4 z-[1000] bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-gray-200 flex items-center gap-4">
      
      {/* 左側：情報テキスト */}
      <div className="flex flex-col leading-tight">
        <h1 className="text-sm font-bold text-gray-800">Ψナラ</h1>
        <p className="text-xs font-bold text-red-500">
          Limit {targetTime.slice(0, 2)}:{targetTime.slice(2, 4)}
        </p>
      </div>

      {/* 区切り線 */}
      <div className="w-px h-6 bg-gray-200"></div>

      {/* 右側：切り替えボタン */}
      <div className="flex items-center gap-2">
        <ModeToggle isEnjoyMode={isEnjoyMode} nextUrl={nextUrl} />
      </div>

    </div>
  );
};
