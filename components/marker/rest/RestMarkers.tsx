// app/components/marker/rest/RestMarkers.tsx
"use client";

import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Wifi } from "lucide-react";
import { renderToString } from "react-dom/server";
import { useMemo } from "react";

import { FilterState } from "@/components/MarkersFilter";
import { naraFreeSeatingSpots } from "@/data/naraFreeSeats"; 
import { naraFreeWiFiSpots } from '@/data/naraFreeWiFi';
import { naraPowerSpots } from '@/data/naraPower';
import { createSeatingIcon, createPowerIcon, createWifiIcon } from '@/components/MarkerIcons'
import type { RestSpot } from "@/types/map";

const RestMarker = ({restSpots, createIcon}: {restSpots: RestSpot[], createIcon: () => L.DivIcon}) => {
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
              
              <div className="flex justify-center gap-2 text-xs">
                {spot.tags.wifi && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full flex items-center gap-1">
                    <Wifi size={12} /> Free Wi-Fi
                  </span>
                )}
                {spot.tags.toilet && (
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full">
                    トイレ有
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

export const RestMarkers = ({ filters }: { filters: FilterState }) => {
    return (
        <div>
            {filters.wifi && (
                <RestMarker restSpots={naraFreeWiFiSpots} createIcon={createWifiIcon} />
            )}
            {filters.power && (
                <RestMarker restSpots={naraPowerSpots} createIcon={createPowerIcon} />
            )}
            {filters.seating && (
                <RestMarker restSpots={naraFreeSeatingSpots} createIcon={createSeatingIcon} />
            )}
        </div>
    )
}
