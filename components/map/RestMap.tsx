// app/components/map/layer/BrowseMapLayer.tsx
"use client";

import { useState } from "react";
import { Layers } from "lucide-react";
import { RestMarkers } from "@/components/marker/rest/RestMarkers";
import { 
  MarkersFilter, 
  FilterMarkerState, 
  FilterTagState 
} from "@/components/MarkersFilter";

export const RestMap = () => {
  const [showFilter, setShowFilter] = useState(false);
  
  // マーカーフィルター状態
  const [markerFilters, setMarkerFilters] = useState<FilterMarkerState>({
    restaurant: true,
    seating: true,
  });
  const toggleMarkerFilter = (key: keyof FilterMarkerState) => {
    setMarkerFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  // タグフィルター状態
  const [tagFilters, setTagFilters] = useState<FilterTagState>({
    wifi: false,
    power: false,
    seating: false,
    toilet: false,
  });
  const toggleTagFilter = (key: keyof FilterTagState) => {
    setTagFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      {/* 休憩スポット群 */}
      <RestMarkers 
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
