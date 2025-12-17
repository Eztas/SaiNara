"use client";

import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Zap, Wifi } from "lucide-react";
import { renderToString } from "react-dom/server";
import { useMemo } from "react";

import { naraPowerSpots } from '@/data/naraPower'

const createPowerIcon = () => {
  const iconHtml = renderToString(
    <div className="relative flex items-center justify-center w-8 h-8 bg-yellow-500 rounded-full shadow-lg border-2 border-white">
      <Zap className="text-white w-5 h-5 fill-white" /> {/* fill-whiteを入れると雷の中も白くなって視認性UP */}
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

export const NaraPowerCafeMarkers = () => {
  const wifiIcon = useMemo(() => createPowerIcon(), []);

  return (
    <>
      {naraPowerSpots.map((spot) => (
        <Marker
          key={spot.name}
          position={[spot.lat, spot.lng]}
          icon={wifiIcon}
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
