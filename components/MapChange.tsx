"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Map, Coffee } from "lucide-react";

export const MapChange = ({ targetTime }: { targetTime: string }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 現在のモード判定
  const isEnjoyMode = pathname.includes("/enjoy");

  // リンク先の生成用ヘルパー
  const createUrl = (path: string) => `${path}?${searchParams.toString()}`;

  return (
    <div className="absolute top-4 left-4 z-[1000] flex flex-col gap-2">
      {/* 1. 情報パネル（分離してスッキリさせる） */}
      <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-gray-200 w-fit">
        <div className="flex items-baseline gap-2">
          <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">
            LIMIT
          </span>
          <span className="text-xs font-bold text-red-500">
            {targetTime.slice(0, 2)}:{targetTime.slice(2, 4)}
          </span>
        </div>
      </div>

      {/* 2. モード切り替えタブ（セグメントコントロール） */}
      <div className="bg-gray-200/90 backdrop-blur-md p-1 rounded-full flex items-center shadow-inner w-fit">
        
        {/* 左：休憩ボタン */}
        <Link
          href={createUrl("/rest")}
          className={`
            flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200
            ${!isEnjoyMode 
              ? "bg-white text-green-700 shadow-sm scale-100" // 選択中
              : "text-gray-500 hover:text-gray-700 hover:bg-gray-300/50" // 非選択
            }
          `}
        >
          <Coffee size={14} />
          休憩
        </Link>

        {/* 右：散策ボタン */}
        <Link
          href={createUrl("/enjoy")}
          className={`
            flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200
            ${isEnjoyMode 
              ? "bg-white text-red-600 shadow-sm scale-100" // 選択中
              : "text-gray-500 hover:text-gray-700 hover:bg-gray-300/50" // 非選択
            }
          `}
        >
          <Map size={14} />
          散策
        </Link>
      </div>
    </div>
  );
};
