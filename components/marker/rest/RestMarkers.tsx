// app/components/marker/rest/RestMarkers.tsx
"use client";

import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useMemo } from "react";
import { Wifi, Zap, Armchair, Toilet } from "lucide-react";

import { FilterMarkerState, FilterTagState, applyTagFilters } from "@/components/MarkersFilter";
import { naraFreeSeatingSpots } from "@/data/naraFreeSeats"; 
import { naraPowerSpots } from '@/data/naraPower';
import { createSeatingIcon, createRestaurantIcon } from '@/components/MarkerIcons'
import type { RestSpot } from "@/types/map";

const RestMarker = ({
  restSpots, 
  createIcon
}: {
  restSpots: RestSpot[], 
  createIcon: () => L.DivIcon
}) => {
  const icon = useMemo(() => createIcon(), []);

  return (
    <>
      {restSpots.map((spot) => (
        <Marker
          key={spot.name}
          position={[spot.lat, spot.lng]}
          icon={icon}
        >
          <Popup>
            <div className="text-center min-w-[200px]">
              <strong className="block text-lg mb-1">{spot.name}</strong>
              <p className="text-sm text-gray-600 mb-2">{spot.address}</p>
              {spot.notes && (
                <div className="bg-gray-50 p-2 rounded text-xs text-gray-700 mb-2 text-left">
                  {spot.notes}
                </div>
              )}
              
              {/* タグ表示 */}
              <div className="flex flex-wrap justify-center gap-2 text-xs">
                {spot.tags.wifi && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full flex items-center gap-1">
                    <Wifi size={12} /> Wi-Fi
                  </span>
                )}
                {spot.tags.power && (
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full flex items-center gap-1">
                    <Zap size={12} /> 充電
                  </span>
                )}
                {spot.tags.seating && (
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full flex items-center gap-1">
                    <Armchair size={12} /> 座席
                  </span>
                )}
                {spot.tags.toilet && (
                  <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full flex items-center gap-1">
                    <Toilet size={12} /> トイレ
                  </span>
                )}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
};

export const RestMarkers = ({ 
  markerFilters,
  tagFilters 
}: { 
  markerFilters: FilterMarkerState;
  tagFilters: FilterTagState;
}) => {
  // タグフィルターを適用したスポットを計算
  const filteredPowerSpots = useMemo(
    () => applyTagFilters(naraPowerSpots, tagFilters),
    [tagFilters]
  );

  const filteredSeatingSpots = useMemo(
    () => applyTagFilters(naraFreeSeatingSpots, tagFilters),
    [tagFilters]
  );

  return (
    <>
      {markerFilters.power && (
        <RestMarker 
          restSpots={filteredPowerSpots} 
          createIcon={createRestaurantIcon} 
        />
      )}
      {markerFilters.seating && (
        <RestMarker 
          restSpots={filteredSeatingSpots} 
          createIcon={createSeatingIcon} 
        />
      )}
    </>
  );
};
