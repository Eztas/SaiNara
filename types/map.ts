// types/map.ts
type BaseSpot = {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  notes?: string;
};

type RestTags = {
  wifi: boolean;
  power: boolean;
  seating: boolean;
  toilet: boolean;
};

// 休憩地点の型
export type RestSpot = BaseSpot & {
  category: "rest";
  tags: RestTags;
};
