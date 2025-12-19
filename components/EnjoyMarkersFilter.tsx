// components/EnjoyMarkersFilter.tsx
"use client";

import { Building, Gift, TicketSlash, Wifi, X, Landmark } from "lucide-react";

// マーカーフィルター（データソース）
export type FilterEnjoyMarkerState = {
  souvenir: boolean;
  sightseeing: boolean;
};

// タグフィルター（機能）
export type FilterEnjoyTagState = {
  wifi: boolean;
  free: boolean;
  indoor: boolean;
};

type MarkersFilterProps = {
  markerFilters: FilterEnjoyMarkerState;
  tagFilters: FilterEnjoyTagState;
  onToggleMarker: (key: keyof FilterEnjoyMarkerState) => void;
  onToggleTag: (key: keyof FilterEnjoyTagState) => void;
  onClose: () => void;
};

export const MarkersFilter = ({ 
  markerFilters, 
  tagFilters,
  onToggleMarker, 
  onToggleTag,
  onClose 
}: MarkersFilterProps) => {
  return (
    <div className="absolute bottom-24 right-4 z-[1000] bg-white rounded-lg shadow-xl p-4 w-64 border border-gray-200 animate-in fade-in slide-in-from-bottom-4 duration-200 max-h-[calc(100vh-200px)] overflow-y-auto">
      <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-100">
        <h3 className="font-bold text-gray-700">表示切り替え</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X size={20} />
        </button>
      </div>

      {/* マーカーフィルター */}
      <div className="mb-4">
        <h4 className="font-bold text-gray-700 text-sm mb-3">場所で絞り込み (OR)</h4>
        <div className="space-y-3">
          <label className="flex items-center justify-between cursor-pointer group">
            <div className="flex items-center gap-2 text-gray-700">
              <div className="bg-red-100 p-1.5 rounded-full text-red-600">
                <Gift size={16} className="fill-red-600" />
              </div>
              <span className="text-sm font-medium">お土産屋</span>
            </div>
            <input
              type="checkbox"
              checked={markerFilters.souvenir}
              onChange={() => onToggleMarker("souvenir")}
              className="w-5 h-5 rounded border-gray-300 text-red-600 focus:ring-red-500"
            />
          </label>
          <label className="flex items-center justify-between cursor-pointer group">
            <div className="flex items-center gap-2 text-gray-700">
              <div className="bg-violet-100 p-1.5 rounded-full text-violet-600">
                <Landmark size={16} />
              </div>
              <span className="text-sm font-medium">観光地</span>
            </div>
            <input
              type="checkbox"
              checked={markerFilters.sightseeing}
              onChange={() => onToggleMarker("sightseeing")}
              className="w-5 h-5 rounded border-gray-300 text-violet-600 focus:ring-violet-500"
            />
          </label>
        </div>
      </div>

      {/* タグフィルター（機能） */}
      <div className="border-t border-gray-200 pt-4">
        <h4 className="font-bold text-gray-700 text-sm mb-3">サービスで絞り込み (AND)</h4>
        <div className="space-y-3">
          <label className="flex items-center justify-between cursor-pointer group">
            <div className="flex items-center gap-2 text-gray-700">
              <div className="bg-blue-50 p-1.5 rounded-full text-blue-600">
                <Wifi size={16} />
              </div>
              <span className="text-sm">Wi-Fi有</span>
            </div>
            <input
              type="checkbox"
              checked={tagFilters.wifi}
              onChange={() => onToggleTag("wifi")}
              className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer group">
            <div className="flex items-center gap-2 text-gray-700">
              <div className="bg-green-50 p-1.5 rounded-full text-green-600">
                <TicketSlash size={16}/>
              </div>
              <span className="text-sm">入場料無料</span>
            </div>
            <input
              type="checkbox"
              checked={tagFilters.free}
              onChange={() => onToggleTag("free")}
              className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer group">
            <div className="flex items-center gap-2 text-gray-700">
              <div className="bg-amber-50 p-1.5 rounded-full text-amber-600">
                <Building size={16} />
              </div>
              <span className="text-sm">屋内</span>
            </div>
            <input
              type="checkbox"
              checked={tagFilters.indoor}
              onChange={() => onToggleTag("indoor")}
              className="w-5 h-5 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
            />
          </label>
        </div>
      </div>

      {/* アクティブなフィルター数の表示 */}
      <div className="mt-4 pt-3 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          {Object.values(markerFilters).filter(Boolean).length}個の場所、
          {Object.values(tagFilters).filter(Boolean).length}個の機能で絞込中
        </p>
      </div>
    </div>
  );
};

/**
 * タグフィルターを適用(AND条件で表示を決定)
 * tagsの中でtrueになっている条件全てを満たす場所を表示
 */
export const applyTagFilters = <T extends { tags: Record<string, boolean> }>(
  spots: T[],
  tagFilters: FilterEnjoyTagState
): T[] => {
  // 全てのタグフィルターがOFFの場合は全て表示
  const activeTagFilters = Object.entries(tagFilters)
    .filter(([_, enabled]) => enabled)
    .map(([key, _]) => key as keyof FilterEnjoyTagState);

  if (activeTagFilters.length === 0) {
    return spots;
  }

  // アクティブなタグを全て持つスポットのみ返す（AND条件）
  return spots.filter(spot =>
    activeTagFilters.every(tag => spot.tags[tag] === true)
  );
};
