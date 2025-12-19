import { renderToString } from "react-dom/server";
import L from "leaflet";
import { Armchair, Wifi, Utensils, Gift } from "lucide-react"; 
 
export const createWifiIcon = (): L.DivIcon => {
  // Tailwindのクラスを当てて、見栄えの良いピンにする
  const iconHtml = renderToString(
    <div className="relative flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full shadow-lg border-2 border-white">
      <Wifi className="text-white w-5 h-5" />
    </div>
  );

  return L.divIcon({
    html: iconHtml,
    className: "custom-leaflet-icon", // Leafletのデフォルトスタイルを無効化するためのクラス
    iconSize: [32, 32],
    iconAnchor: [16, 36], // マーカーの先端が座標に来るように調整
    popupAnchor: [0, -36],
  });
};

export const createSeatingIcon = (): L.DivIcon => {
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

export const createRestaurantIcon = (): L.DivIcon => {
  const iconHtml = renderToString(
    <div className="relative flex items-center justify-center w-8 h-8 bg-orange-500 rounded-full shadow-lg border-2 border-white">
      <Utensils className="text-white w-5 h-5 fill-white" /> {/* fill-whiteを入れると雷の中も白くなって視認性UP */}
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

export const createGiftIcon = (): L.DivIcon => {
  // Tailwindのクラスを当てて、見栄えの良いピンにする
  const iconHtml = renderToString(
    <div className="relative flex items-center justify-center w-8 h-8 bg-red-500 rounded-full shadow-lg border-2 border-white">
      <Gift className="text-white w-5 h-5" />
    </div>
  );

  return L.divIcon({
    html: iconHtml,
    className: "custom-leaflet-icon", // Leafletのデフォルトスタイルを無効化するためのクラス
    iconSize: [32, 32],
    iconAnchor: [16, 36], // マーカーの先端が座標に来るように調整
    popupAnchor: [0, -36],
  });
};
