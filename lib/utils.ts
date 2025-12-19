import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { RestSpot } from "@/types/map";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const calculateRadiusFromTime = (targetTime: string, walkingSpeed: number): {remainingMinutes: number, calcRadius: number} => {
  const now = new Date();
  const target = new Date();
  const hours = parseInt(targetTime.slice(0, 2), 10);
  const minutes = parseInt(targetTime.slice(2, 4), 10);
  target.setHours(hours, minutes, 0, 0);

  // 日付またぎの簡易対応（ターゲットが過去時刻なら明日のこととする場合など）
  // ※必要に応じて調整してください
  if (target.getTime() < now.getTime()) {
     // target.setDate(target.getDate() + 1); // 必要ならコメントアウト解除
  }

  const diffSeconds = (target.getTime() - now.getTime()) / 1000;
  if (diffSeconds <= 0) return { remainingMinutes: 0, calcRadius: 0 };

  const remainingMinutes = diffSeconds / 60;
  const calcRadius = remainingMinutes * walkingSpeed; 

  return { remainingMinutes, calcRadius };
};

// ハーサイン距離を計算する関数
export const getDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
  const R = 6371000; // 地球の半径 (m)
  const toRad = (value: number) => (value * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const filterSpotsInCircle = (
  allSpots: RestSpot[],
  centerLat: number,
  centerLng: number,
  targetTime: string
): RestSpot[] => {
  const {remainingMinutes, calcRadius} = calculateRadiusFromTime(targetTime, 50);
  
  if (calcRadius <= 0) return []; // 時間切れなら空

  return allSpots.filter((spot) => {
    const dist = getDistance(centerLat, centerLng, spot.lat, spot.lng);
    return dist <= calcRadius;
  });
};
