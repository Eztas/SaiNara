// lib/allSpots.ts
import { naraPowerSpots } from '@/data/naraPower';
import { naraFreeSeatingSpots } from '@/data/naraFreeSeats';
import { RestSpot } from '@/types/map';

// 全データを結合
export const allNaraRestSpots: RestSpot[] = [
  ...naraPowerSpots,
  ...naraFreeSeatingSpots,
];
