"use client";

import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { RestSpot } from '@/types/map';
import { Wifi, Zap, Armchair, Toilet } from "lucide-react";

const recommendIcon = new L.Icon({
  // URLの末尾を 'marker-icon-gold.png' に変更
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

type RecommendMarkerProps = {
  spot: RestSpot;
};

export const RecommendMarker = ({ spot }: RecommendMarkerProps) => {
  return (
    <Marker position={[spot.lat, spot.lng]} icon={recommendIcon}>
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
                  <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full flex items-center gap-1">
                    <Armchair size={12} /> 座席
                  </span>
                )}
                {spot.tags.toilet && (
                  <span className="px-2 py-1 bg-violet-100 text-violet-700 rounded-full flex items-center gap-1">
                    <Toilet size={12} /> トイレ
                  </span>
                )}
              </div>
            </div>
          </Popup>
    </Marker>
  );
};
