"use client";

import {
  Armchair,
  Bath,
  Camera,
  Gift,
  Wifi,
  Zap
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LOCATIONS = [
  {
    id: "kintetsu-nara-station",
    name: "近鉄奈良駅",
    lat: 34.6841376,
    lng: 135.8285414,
  },
  {
    id: "jr-nara-station",
    name: "JR奈良駅",
    lat: 34.681215,
    lng: 135.819577,
  },
  {
    id: "nara-park-bus-terminal",
    name: "奈良公園バスターミナル",
    lat: 34.685096559119,
    lng: 135.83448913307,
  },
];

const MODES = [
  {
    id: "rest",
    name: "休憩モード",
    path: "/rest",
    description: "休憩に適した場所を表示",
    features: [
      { icon: Wifi, label: "Wi-Fi" },
      { icon: Zap, label: "充電" },
      { icon: Armchair, label: "休憩" },
      { icon: Bath, label: "トイレ" },
    ],
    color: "bg-blue-50 border-blue-200 text-blue-900",
    activeColor: "ring-2 ring-blue-500 bg-blue-100 border-blue-500",
  },
  {
    id: "recommend",
    name: "AIおすすめモード",
    path: "/recommend",
    description: "AIがおすすめのスポットを表示",
    features: [
      { icon: Gift, label: "お土産" },
      { icon: Camera, label: "映え" },
    ],
    color: "bg-orange-50 border-orange-200 text-orange-900",
    activeColor: "ring-2 ring-orange-500 bg-orange-100 border-orange-500",
  },
];

export default function Home() {
  const router = useRouter();
  const [time, setTime] = useState("");
  const [locationId, setLocationId] = useState(LOCATIONS[0].id);
  const [modeId, setModeId] = useState(MODES[0].id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!time) {
      alert("到着時刻を入力してください");
      return;
    }

    // Validation: Cannot select past time
    const now = new Date();
    const [hours, minutes] = time.split(":").map(Number);
    const targetDate = new Date();
    targetDate.setHours(hours, minutes, 0, 0);

    if (targetDate < now) {
      alert("過去の時刻は指定できません");
      return;
    }

    const selectedLocation = LOCATIONS.find((loc) => loc.id === locationId);
    if (!selectedLocation) return;

    const selectedMode = MODES.find((m) => m.id === modeId);
    if (!selectedMode) return;

    // Format time to HHMM (remove :)
    const formattedTime = time.replace(":", "");

    const params = new URLSearchParams({
      lat: selectedLocation.lat.toString(),
      lng: selectedLocation.lng.toString(),
      time: formattedTime,
    });

    router.push(`${selectedMode.path}?${params.toString()}`);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f8f5e3] px-4 py-6 font-sans text-stone-800">
      <main className="w-full max-w-md space-y-8 rounded-2xl bg-white/80 p-8 shadow-xl backdrop-blur-sm ring-1 ring-stone-900/5 transition-all">
        <div className="flex flex-col items-center gap-2">
          {/* Logo or Title Area */}
          <div className="relative h-24 w-24">
             {/* Placeholder for a cute smooth icon */}
             <div className="absolute inset-0 animate-pulse rounded-full bg-orange-100 opacity-50"></div>
             <div className="flex h-full w-full items-center justify-center rounded-full bg-orange-50 text-3xl">
                🦌
             </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-stone-900">
            Ψナラ
          </h1>
          <p className="text-center text-stone-600">
            奈良旅行の最後を<br/>最高に締めくくろう
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="time" className="block text-sm font-bold text-stone-500">
              到着時刻
            </label>
            <input
              type="time"
              id="time"
              required
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="block w-full rounded-lg border-stone-200 bg-white p-4 text-center text-3xl font-bold text-stone-900 shadow-sm transition-all focus:border-orange-500 focus:ring-orange-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="location" className="block text-sm font-bold text-stone-500">
              目的地
            </label>
            <select
              id="location"
              value={locationId}
              onChange={(e) => setLocationId(e.target.value)}
              className="block w-full rounded-lg border-stone-200 bg-white p-3 text-lg font-medium text-stone-900 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            >
              {LOCATIONS.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-stone-500">
              表示するスポット
            </label>
            <div className="flex flex-col gap-3">
              {MODES.map((mode) => (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => setModeId(mode.id)}
                  className={`relative flex w-full flex-col items-start rounded-xl border p-4 text-left transition-all ${
                    modeId === mode.id ? mode.activeColor : mode.color
                  }`}
                >
                  <div className="mb-1 flex w-full items-center justify-between">
                    <span className="text-lg font-bold">{mode.name}</span>
                  </div>
                  <p className="mb-3 text-sm opacity-80">{mode.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {mode.features.map((feature, idx) => (
                      <span key={idx} className="flex items-center gap-1 rounded-full bg-white/60 px-2 py-1 text-[12px] font-medium backdrop-blur-sm">
                        <feature.icon size={15} />
                        {feature.label}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="group relative flex w-full justify-center overflow-hidden rounded-full bg-stone-900 px-6 py-4 text-lg font-bold text-white shadow-lg transition-all hover:bg-stone-800 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
          >
            <span className="relative z-10 flex items-center gap-2">
              案内を開始する
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </span>
          </button>
        </form>
      </main>
      
      <footer className="mt-12 text-center text-xs text-stone-400">
        © 2025 SaiNara All Rights Reserved.
      </footer>
    </div>
  );
}
