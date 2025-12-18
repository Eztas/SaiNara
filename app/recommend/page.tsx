// app/recommend/page.tsx
'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Search, MapPin, Loader2, ArrowLeft } from 'lucide-react'; // アイコンを追加

// 地図コンポーネントを動的インポート
const BaseMap = dynamic(() => import('@/components/map/BaseMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-900 text-white">
      <Loader2 className="animate-spin mr-2" />
      Loading Map...
    </div>
  ),
});

const RecommendMarker = dynamic(
  () => import('@/components/marker/RecommendMarker').then((mod) => mod.RecommendMarker),
  { ssr: false }
);

export default function SpotSearchPage() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!input.trim()) return;
    
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: input }),
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await res.json();
      setResult(data);

    } catch (e) {
      console.error(e);
      // エラー時はアラートなどで通知し、ローディングを解除
      alert("検索に失敗しました。もう一度お試しください。");
    } finally {
      setLoading(false);
    }
  };

  // リセット（検索結果をクリアしてチャット画面に戻る）
  const handleReset = () => {
    setResult(null);
    setInput('');
  };

  // ----------------------------------------------------------------
  // 状態 1: ローディング中
  // ----------------------------------------------------------------
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50 z-50">
        <div className="flex flex-col items-center p-8 bg-white rounded-2xl shadow-xl">
          <Loader2 className="h-12 w-12 text-blue-600 animate-spin mb-4" />
          <h2 className="text-xl font-bold text-gray-800">AIが思考中...</h2>
          <p className="text-gray-500 mt-2">最適なスポットを探しています</p>
          <div className="mt-4 text-sm text-gray-400">"{input}"</div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------------------
  // 状態 2: 検索結果あり (地図をまるまる表示)
  // ----------------------------------------------------------------
  if (result && result.lat && result.lng) {
    return (
      <div className="relative w-full h-screen overflow-hidden">
        {/* 地図コンポーネント (背景全面) */}
        <div className="absolute inset-0 z-0">
            <BaseMap center={[result.lat, result.lng]}>
                <RecommendMarker spot={result} />
            </BaseMap>
        </div>

        {/* 検索バーと戻るボタン (地図の上に浮かべる) */}
        <div className="absolute top-0 left-0 w-full z-10 p-4 bg-gradient-to-b from-black/50 to-transparent pointer-events-none">
          <div className="max-w-4xl mx-auto flex gap-2 pointer-events-auto">
            <button 
              onClick={handleReset}
              className="bg-white text-gray-700 p-3 rounded-lg shadow hover:bg-gray-100 transition"
              title="検索に戻る"
            >
              <ArrowLeft size={20} />
            </button>
          </div>
        </div>

        {/* (任意) 画面下部にテキスト情報の簡易表示オーバーレイ */}
        <div className="absolute bottom-6 left-4 right-4 z-10 pointer-events-none">
            <div className="mx-auto max-w-xl bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-gray-200 pointer-events-auto">
                <h2 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                  <MapPin className="text-red-500" size={18} />
                  {result.name}
                </h2>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {result.notes}
                </p>
            </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------------------
  // 状態 3: 初期表示 (チャット画面のみ)
  // ----------------------------------------------------------------
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 p-4">
      <div className="w-full max-w-2xl text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Ψなら AIコンシェルジュ</h1>
        <p className="text-gray-500">あなたの要望に合わせて、奈良の休憩スポットをご提案します</p>
      </div>

      <div className="w-full max-w-2xl bg-white p-2 rounded-xl shadow-lg border border-gray-200 flex gap-2">
        <input
          type="text"
          className="flex-1 p-4 text-lg bg-transparent border-none focus:ring-0 text-black placeholder-gray-400 outline-none"
          placeholder="例: 鹿を見ながらコーヒーが飲みたい"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoFocus
        />
        <button
          onClick={handleSearch}
          className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
        >
          <Search size={20} />
          送信
        </button>
      </div>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-500 w-full max-w-2xl">
        <div className="bg-white p-3 rounded border text-center cursor-pointer hover:bg-gray-50 transition" onClick={() => setInput("電源があって静かに作業できるカフェ")}>
          ⚡️ 電源があるカフェ
        </div>
        <div className="bg-white p-3 rounded border text-center cursor-pointer hover:bg-gray-50 transition" onClick={() => setInput("鹿が見える休憩ベンチ")}>
          🦌 鹿が見えるベンチ
        </div>
        <div className="bg-white p-3 rounded border text-center cursor-pointer hover:bg-gray-50 transition" onClick={() => setInput("Wi-Fiが使える無料の休憩所")}>
          📶 Wi-Fi完備の休憩所
        </div>
      </div>
    </div>
  );
}
