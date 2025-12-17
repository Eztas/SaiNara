// app/components/marker/rest/NaraFreeSeatingMarkers.tsx
"use client";

import { useMemo } from "react";
import { renderToString } from "react-dom/server";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Armchair } from "lucide-react"; 

import { naraFreeSeatingSpots } from "@/data/naraFreeSeats"; 

// 休憩所用のカスタムアイコンを作成
const createSeatingIcon = () => {
  const iconHtml = renderToString(
    <div className="relative flex items-center justify-center w-8 h-8 bg-green-500 rounded-full shadow-lg border-2 border-white">
      <Armchair className="text-white w-5 h-5" />
    </div>
  );

  return L.divIcon({
    html: iconHtml,
    className: "custom-leaflet-icon",
    iconSize: [32, 32],
    iconAnchor: [16, 36],
    popupAnchor: [0, -36],
  });
};

export const NaraFreeSeatingMarkers = () => {
  const restIcon = useMemo(() => createSeatingIcon(), []);

  return (
    <>
      {naraFreeSeatingSpots.map((spot) => (
        <Marker
          key={spot.name}
          position={[spot.lat, spot.lng]}
          icon={restIcon}
        >
          <Popup>
            <div className="text-center min-w-[200px]">
              <strong className="block text-lg mb-1">{spot.name}</strong>
              <p className="text-xs text-gray-500 mb-2">{spot.address}</p>

              {spot.notes && (
                <div className="bg-gray-50 p-2 rounded text-xs text-gray-700 mb-2 text-left">
                  {spot.notes}
                </div>
              )}
              
              <div className="flex flex-wrap justify-center gap-1 text-xs mt-2">
                {spot.tags.toilet && (
                  <span className="px-2 py-1 bg-cyan-100 text-cyan-700 rounded-full border border-cyan-200">
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
