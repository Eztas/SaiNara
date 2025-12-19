// data/naraSouvenirSpots.ts
import { EnjoySpot } from '@/types/map'; // 型定義のパスに合わせて変更してください

export const naraSouvenirSpots: EnjoySpot[] = [
  // ----------------------------------------------------------------
  // 包括的なお土産屋 (色々なお土産を一度に見られる場所)
  // ----------------------------------------------------------------
  {
    id: "1",
    name: "なら和み館",
    address: "奈良県奈良市高畑町1071",
    lat: 34.67857808584529,
    lng: 135.83524794096294,
    notes: "お菓子から雑貨まで幅広く揃い、レストランやカフェも併設。お土産屋の時間は16:30までなので注意",
    category: "enjoy",
    tags: {
      wifi: true,
      free: true, // 入館無料
      indoor: true,
    },
    url: "https://www.worldheritage.co.jp/nagomi/souvenir/",
    time: ["0930", "1630"],
  },
  {
    id: "2",
    name: "奈良銘品館 JR奈良駅店",
    address: "奈良県奈良市三条本町1-1",
    lat: 34.681240467426804,
    lng: 135.8191124544552,
    notes: "JR奈良駅直結の商業施設。ビエラ2Fにある「奈良銘品館」は老舗の銘菓や柿の葉寿司などが一通り揃うため、帰り際の購入に最適。",
    category: "enjoy",
    tags: {
      wifi: true,
      free: true,
      indoor: true,
    },
    url: "https://kansaionepass.com/ja/article/detail/394",
    time: ["1000", "2100"],
  },
  {
    id: "3",
    name: "Time's Place 奈良 (近鉄奈良駅)",
    address: "奈良県奈良市中筋町",
    lat: 34.684178341009776,
    lng: 135.8278262967838,
    notes: "近鉄奈良駅改札外のショッピングモール。まほろば大仏プリンや柿の葉寿司など、定番土産がコンパクトにまとまっている。",
    category: "enjoy",
    tags: {
      wifi: false, // 公衆Wifiはあるが店舗固有は場所による
      free: true,
      indoor: true,
    },
    url: "https://kintetsu-rs.com/station/timesplace/nara/",
    time: ["0900", "2000"],
  },
  {
    id: "4",
    name: "奈良銘品館 奈良公園バスターミナル店",
    address: "奈良市登大路町76",
    lat: 34.68482397335675,
    lng: 135.83385961212724,
    notes: "吉野本葛や大和茶を使用したオリジナルのソフトクリームも人気。奈良公園周辺で手軽にお土産を購入できる。",
    category: "enjoy",
    tags: {
      wifi: true, // 公衆Wifiはあるが店舗固有は場所による
      free: true,
      indoor: true,
    },
    url: "https://www.nakoservice.co.jp/shop.html",
    time: ["1000", "1830"],
  },
  {
    id: "5",
    name: "奈良銘品館 三条通店",
    address: "奈良市三条町480",
    lat: 34.68200735668486,
    lng: 135.82190936794765,
    notes: "昔ながらの奈良の名産品やづっとならグッズ（奈良交通のオリジナル商品）、自然食品等",
    category: "enjoy",
    tags: {
      wifi: false,
      free: true,
      indoor: true,
    },
    url: "https://www.nakoservice.co.jp/shop.html",
    time: ["0900", "1800"],
  },
  {
    id: "6",
    name: "奈良みやげ横丁",
    address: "奈良県奈良市東向南町５",
    lat: 34.68260490831321,
    lng: 135.829088636103,
    notes: "休憩・飲食コーナーも有り, 奈良の銘菓、奈良の地酒、奈良の雑貨",
    category: "enjoy",
    tags: {
      wifi: false,
      free: true,
      indoor: true,
    },
    time: ["1000", "1830"],
  },
  // ----------------------------------------------------------------
  // 局所的・奈良らしいお土産屋 (お菓子・雑貨・専門店)
  // ----------------------------------------------------------------
  {
    id: "7",
    name: "中谷堂",
    address: "奈良県奈良市橋本町29",
    lat: 34.6818,
    lng: 135.8294,
    notes: "消費期限は当日なので注意, できたての高速餅つきが名物で、出来立てを食べるのがおすすめ",
    category: "enjoy",
    tags: {
      wifi: false,
      free: true,
      indoor: true,
    },
    url: "http://www.nakatanidou.jp/",
    time: ["1000", "1900"],
  },
];
