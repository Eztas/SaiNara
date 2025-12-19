import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

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
