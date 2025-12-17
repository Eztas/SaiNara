// data/naraPower.ts

// 充電スポット、という名のカフェ位置情報

import { RestSpot } from '@/types/map'

export const naraPowerSpots: RestSpot[] = [
  {
    id: "1",
    name: "マクドナルド 奈良店",
    address: "奈良県奈良市東向南町21",
    lat: 34.68311777713713,
    lng: 135.82863181031215,
    category: "rest",
    tags: { wifi: false, power: true, seating: true, toilet: true },
    notes: "2階のカウンターの席に4つだけ充電器がある"
  },
 {
    id: "2",
    name: "スターバックス奈良鴻ノ池運動公園店",
    address: "奈良県 奈良市 法蓮佐保山4-1703-1",
    lat: 34.6961232568768,
    lng: 135.82641943049595,
    category: "rest",
    tags: { wifi: true, power: true, seating: true, toilet: true },
    notes: "1席のみで充電コンセントが使える"
  },
  {
    id: "3",
    name: "おてんきパーラー",
    address: "〒奈良県奈良市高天町46-1 変なホテル 1F",
    lat: 34.68394063222052,
    lng: 135.82615393545584,
    category: "rest",
    tags: { wifi: true, power: true, seating: true, toilet: true },
    notes: "入って左手中程から奥のベンチ席足元4ヶ所に2口コンセントあり"
  },
  {
    id: "4",
    name: "カフェ・ド・クリエ 奈良三条通店",
    address: "奈良市角振町6-1 奈良フコク生命ビル1F",
    lat: 34.68194980196712,
    lng: 135.82751285448754,
    category: "rest",
    tags: { wifi: true, power: true, seating: true, toilet: true },
    notes: "北面東面窓際カウンター席に1口コンセントあり"
  },
  {
    id: "5",
    name: "CHAMI",
    address: "奈良県奈良市角振新屋町6-2",
    lat: 34.68183527735656,
    lng: 135.82769593861136,
    category: "rest",
    tags: { wifi: false, power: true, seating: true, toilet: true },
    notes: "2Fイートインスペース西側吹き抜け前カウンター席2ヶ所にアース付2口コンセントあり"
  },
  {
    id: "6",
    name: "カフェ エトランジェ ナラッド",
    address: "奈良県奈良市上三条町23-4 内 観光センター「ナラニクル」",
    lat: 34.6823885461674,
    lng: 135.82592598332255,
    category: "rest",
    tags: { wifi: false, power: true, seating: true, toilet: true }
  },
  {
    id: "7",
    name: "珈琲館 奈良三条店",
    address: "奈良市下三条町38",
    lat: 34.68230072086569,
    lng: 135.8237565121577,
    category: "rest",
    tags: { wifi: true, power: true, seating: true, toilet: true }
  },
    {
    id: "8",
    name: "二パチ 奈良三条店",
    address: "奈良県奈良市下三条町44-2 冨士屋ビル 1F",
    lat: 34.682222718709546,
    lng: 135.82417500584882,
    category: "rest",
    tags: { wifi: true, power: true, seating: true, toilet: true },
    notes: "奈良市の居酒屋ニパチ三条通り店で壁のコンセント借りられました。SoftbankWi-Fiがつかえます"
  },
  {
    id: "9",
    name: "ガスト 奈良三条店",
    address: "奈良県奈良市下三条町31-1",
    lat: 34.68225476309241,
    lng: 135.8229669833229,
    category: "rest",
    tags: { wifi: true, power: true, seating: true, toilet: true }
  },
  {
    id: "10",
    name: "カフェ チャオプレッソ奈良駅店",
    address: "奈良県奈良市東向中町29",
    lat: 34.684488174508296,
    lng: 135.8280934544875,
    category: "rest",
    tags: { wifi: true, power: true, seating: true, toilet: true }
  },
  {
    id: "11",
    name: "カフェ クルール",
    address: "奈良県奈良市登大路町30 奈良県庁東棟1F",
    lat: 34.68527022161983,
    lng: 135.83354556547576,
    category: "rest",
    tags: { wifi: true, power: true, seating: true, toilet: true }
  },
  {
    id: "12",
    name: "アミューズメントCUE 奈良三条店",
    address: "奈良県奈良市三条町478-1",
    lat: 34.682071130856244,
    lng: 135.82211746796688,
    category: "rest",
    tags: { wifi: true, power: true, seating: true, toilet: true }
  },
  {
    id: "13",
    name: "モスバーガー JR奈良店",
    address: "奈良県奈良市三条本町1-1",
    lat: 34.68079505889941,
    lng: 135.81894426989768,
    category: "rest",
    tags: { wifi: true, power: true, seating: true, toilet: true },
    notes: "奈良駅 高架下自由通路東口(ビエラ奈良内)"
  },
  {
    id: "14",
    name: "YAMATO BASE 奈良店",
    address: "奈良県奈良市三条町475 松田ビル2F",
    lat: 34.681883591394545,
    lng: 135.82235775278278,
    category: "rest",
    tags: { wifi: true, power: true, seating: true, toilet: true }
  },
  {
    id: "15",
    name: "スターバックス JR奈良駅旧駅舎店",
    address: "奈良県 奈良市 三条本町1082 奈良市総合観光案内所",
    lat: 34.68184941899611,
    lng: 135.81982512570534,
    category: "rest",
    tags: { wifi: true, power: true, seating: true, toilet: true }
  },
];
