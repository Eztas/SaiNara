// app/recommend/page.tsx
'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Search, MapPin, Loader2, ArrowLeft } from 'lucide-react'; // アイコンを追加

import { RecommendChat } from '@/components/RecommendChat';
import { RestSpot } from '@/types/map';

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
  const [result, setResult] = useState<RestSpot | null>(null);
  const [reason, setReason] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!input.trim()) return;
    
    setLoading(true);
    setResult(null);
    setReason(null);

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
      setResult(data.spot);
      setReason(data.reason);

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
          <h2 className="text-xl font-bold text-gray-800">S-AI ナラが検索中...</h2>
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

        {/* 戻るボタン */}
        <div className="absolute top-4 left-4 z-[1000]">
          <button 
            onClick={handleReset}
            className="bg-white text-gray-700 p-3 rounded-full shadow-lg border border-gray-200 hover:bg-gray-50 transition flex items-center justify-center"
            title="検索に戻る"
            aria-label="検索画面に戻る"
          >
              <ArrowLeft size={24} />
          </button>
        </div>

        {/* 画面下部にテキスト情報の簡易表示オーバーレイ */}
        <div className="absolute bottom-6 left-4 right-4 z-10 pointer-events-none">
            <div className="mx-auto max-w-xl bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-gray-200 pointer-events-auto">
                <h2 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                  <MapPin className="text-red-500" size={18} />
                  {result.name}
                </h2>
                <p className="text-sm text-gray-600 mt-1 max-h-24 overflow-y-auto">
                  {reason}
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
    <RecommendChat input={input} setInput={setInput} handleSearch={handleSearch} />
  );
}
