// components/map/EnjoyMap.tsx
"use client";

import { useState } from "react";
import { Layers } from "lucide-react";
import { EnjoyMarkers } from "@/components/marker/enjoy/EnjoyMarkers";
import { 
  MarkersFilter, 
  FilterEnjoyMarkerState, 
  FilterEnjoyTagState 
} from "@/components/EnjoyMarkersFilter";

export const EnjoyMap = () => {
  const [showFilter, setShowFilter] = useState(false);
  
  // マーカーフィルター状態
  const [markerFilters, setMarkerFilters] = useState<FilterEnjoyMarkerState>({
    souvenir: true,
    sightseeing: true,
  });
  const toggleMarkerFilter = (key: keyof FilterEnjoyMarkerState) => {
    setMarkerFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  // タグフィルター状態
  const [tagFilters, setTagFilters] = useState<FilterEnjoyTagState>({
    wifi: false,
    free: false,
    indoor: false,
  });
  const toggleTagFilter = (key: keyof FilterEnjoyTagState) => {
    setTagFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      {/* 休憩スポット群 */}
      <EnjoyMarkers 
        markerFilters={markerFilters} 
        tagFilters={tagFilters}
      />

      {/* フィルターボタン */}
      <button
        onClick={() => setShowFilter(!showFilter)}
        className="absolute bottom-6 right-4 z-[1000] w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors border border-gray-200"
        aria-label="地図フィルターを開く"
       >
         <Layers size={24} />
       </button>

      {showFilter && (
        <MarkersFilter
          markerFilters={markerFilters}
          tagFilters={tagFilters}
          onToggleMarker={toggleMarkerFilter}
          onToggleTag={toggleTagFilter}
          onClose={() => setShowFilter(false)}
        />
      )}
    </>
  );
};
