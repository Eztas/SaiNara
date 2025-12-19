// app/components/marker/enjoy/EnjoyMarkers.tsx
"use client";

import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useMemo } from "react";
import { Wifi, TicketSlash, Building } from "lucide-react";

import { FilterEnjoyMarkerState, FilterEnjoyTagState, applyTagFilters } from "@/components/EnjoyMarkersFilter";
import { naraSouvenirSpots } from "@/data/naraSouvenirSpots"; 
import { naraSightSeeingSpots } from "@/data/naraSightSeeingSpots"; 
import { createGiftIcon, createLandmarkIcon } from '@/components/MarkerIcons'
import type { EnjoySpot } from "@/types/map";

const EnjoyMarker = ({
  enjoySpots, 
  createIcon
}: {
  enjoySpots: EnjoySpot[], 
  createIcon: () => L.DivIcon
}) => {
  const icon = useMemo(() => createIcon(), []);

  return (
    <>
      {enjoySpots.map((spot) => (
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
              {spot.url && (
                <div className="bg-gray-50 p-2 rounded text-xs text-gray-700 mb-2 text-left">
                  {spot.url}
                </div>
              )}
              
              {/* タグ表示 */}
              <div className="flex flex-wrap justify-center gap-2 text-xs">
                {spot.tags.wifi && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full flex items-center gap-1">
                    <Wifi size={12} /> Wi-Fi
                  </span>
                )}
                {spot.tags.free && (
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full flex items-center gap-1">
                    <TicketSlash size={12} /> 入場料無料
                  </span>
                )}
                {spot.tags.indoor && (
                  <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full flex items-center gap-1">
                    <Building size={12} /> 屋内
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

export const EnjoyMarkers = ({ 
  markerFilters,
  tagFilters 
}: { 
  markerFilters: FilterEnjoyMarkerState;
  tagFilters: FilterEnjoyTagState;
}) => {
  // タグフィルターを適用したスポットを計算
  const filteredSouvenirSpots  = useMemo(
    () => applyTagFilters(naraSouvenirSpots, tagFilters),
    [tagFilters]
  );
  const filteredightSeeingSpots  = useMemo(
    () => applyTagFilters(naraSightSeeingSpots, tagFilters),
    [tagFilters]
  );

  return (
    <>
      {markerFilters.souvenir && (
        <EnjoyMarker 
          enjoySpots={filteredSouvenirSpots} 
          createIcon={createGiftIcon} 
        />
      )}
      {markerFilters.sightseeing && (
        <EnjoyMarker 
          enjoySpots={filteredightSeeingSpots} 
          createIcon={createLandmarkIcon} 
        />
      )}
    </>
  );
};
