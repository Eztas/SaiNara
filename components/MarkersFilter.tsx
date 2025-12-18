"use client";

import { Wifi, Zap, Armchair, Toilet, X } from "lucide-react";

export type FilterMarkerState = {
  wifi: boolean;
  power: boolean;
  seating: boolean;
};

export type FilterTagState = {
  wifi: boolean;
  power: boolean;
  seating: boolean;
  toilet: boolean;
};

type MarkersFilterProps = {
  filters: FilterMarkerState;
  onToggle: (key: keyof FilterMarkerState) => void;
  onClose: () => void;
};

type TagFilterProps = {
  filters: FilterTagState;
  onToggle: (key: keyof FilterTagState) => void;
  onClose: () => void;
};

export const MarkersFilter = ({ filters, onToggle, onClose }: MarkersFilterProps) => {
  return (
    <div className="absolute bottom-24 right-4 z-[1000] bg-white rounded-lg shadow-xl p-4 w-64 border border-gray-200 animate-in fade-in slide-in-from-bottom-4 duration-200">
      <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-100">
        <h3 className="font-bold text-gray-700">表示切り替え</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X size={20} />
        </button>
      </div>

      <h3 className="font-bold text-gray-700 mb-4">マーカーフィルター</h3>
      <div className="space-y-3 mb-4">
        <label className="flex items-center justify-between cursor-pointer group">
          <div className="flex items-center gap-2 text-gray-700">
            <div className="bg-blue-100 p-1.5 rounded-full text-blue-600">
              <Wifi size={16} />
            </div>
            <span className="text-sm font-medium">Free Wi-Fi</span>
          </div>
          <input
            type="checkbox"
            checked={filters.wifi}
            onChange={() => onToggle("wifi")}
            className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
        </label>

        <label className="flex items-center justify-between cursor-pointer group">
          <div className="flex items-center gap-2 text-gray-700">
            <div className="bg-yellow-100 p-1.5 rounded-full text-yellow-600">
              <Zap size={16} className="fill-yellow-600" />
            </div>
            <span className="text-sm font-medium">充電スポット(飲食店)</span>
          </div>
          <input
            type="checkbox"
            checked={filters.power}
            onChange={() => onToggle("power")}
            className="w-5 h-5 rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
          />
        </label>

        <label className="flex items-center justify-between cursor-pointer group">
          <div className="flex items-center gap-2 text-gray-700">
            <div className="bg-green-100 p-1.5 rounded-full text-green-600">
              <Armchair size={16} />
            </div>
            <span className="text-sm font-medium">無料休憩所 (ベンチ)</span>
          </div>
          <input
            type="checkbox"
            checked={filters.seating}
            onChange={() => onToggle("seating")}
            className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
          />
        </label>
      </div>

      <h3 className="font-bold text-gray-700 mb-4">タグフィルター</h3>
      <div className="space-y-3">
        <label className="flex items-center justify-between cursor-pointer group">
          <div className="flex items-center gap-2 text-gray-700">
            <div className="bg-blue-100 p-1.5 rounded-full text-blue-600">
              <Wifi size={16} />
            </div>
            <span className="text-sm font-medium">Free Wi-Fi</span>
          </div>
          <input
            type="checkbox"
            checked={filters.wifi}
            onChange={() => onToggle("wifi")}
            className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
        </label>

        <label className="flex items-center justify-between cursor-pointer group">
          <div className="flex items-center gap-2 text-gray-700">
            <div className="bg-yellow-100 p-1.5 rounded-full text-yellow-600">
              <Zap size={16} className="fill-yellow-600" />
            </div>
            <span className="text-sm font-medium">充電スポット(飲食店)</span>
          </div>
          <input
            type="checkbox"
            checked={filters.power}
            onChange={() => onToggle("power")}
            className="w-5 h-5 rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
          />
        </label>

        <label className="flex items-center justify-between cursor-pointer group">
          <div className="flex items-center gap-2 text-gray-700">
            <div className="bg-green-100 p-1.5 rounded-full text-green-600">
              <Armchair size={16} />
            </div>
            <span className="text-sm font-medium">無料休憩所 (ベンチ)</span>
          </div>
          <input
            type="checkbox"
            checked={filters.seating}
            onChange={() => onToggle("seating")}
            className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
          />
        </label>

        <label className="flex items-center justify-between cursor-pointer group">
          <div className="flex items-center gap-2 text-gray-700">
            <div className="bg-red-100 p-1.5 rounded-full text-red-600">
              <Toilet size={16} />
            </div>
            <span className="text-sm font-medium">トイレ</span>
          </div>
          <input
            type="checkbox"
            checked={filters.seating}
            onChange={() => onToggle("seating")}
            className="w-5 h-5 rounded border-gray-300 text-red-600 focus:ring-red-500"
          />
        </label>
      </div>
    </div>
  );
};