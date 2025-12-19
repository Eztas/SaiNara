// types/map.ts
type BaseSpot = {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  notes?: string;
};

export type RestTags = {
  wifi: boolean;
  power: boolean;
  seating: boolean;
  toilet: boolean;
};

export type EnjoyTags = {
  wifi: boolean; // フリーwifiがあるかどうか
  free: boolean; // 入場料無料か(実質何かを購入しなくて済むか)
};

// 休憩地点の型
export type RestSpot = BaseSpot & {
  category: "rest";
  tags: RestTags;
};

// 観光地点の型
export type EnjoySpot = BaseSpot & {
  category: "enjoy";
  tags: EnjoyTags;
  url?: string;
  time: [string, string]; // 開始時間と終了時間
};
