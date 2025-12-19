// app/recommend/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from "next/navigation";
import dynamic from 'next/dynamic';
import { MapPin, Loader2, ArrowLeft } from 'lucide-react'; // アイコンを追加

import { RecommendChat } from '@/components/RecommendChat';
import { RestSpot } from '@/types/map';
import { parseCoords, parseTime } from '@/lib/validation';

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

const STORAGE_KEY = 'recommend_spot_data';

export default function SpotSearchPage() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<RestSpot | null>(null);
  const [reason, setReason] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    // windowオブジェクトが存在するか確認（Next.jsのお作法）
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        try {
          const parsed = JSON.parse(savedData);
          // データの中身がちゃんとしているか簡易チェック
          if (parsed.result && parsed.reason) {
            setResult(parsed.result);
            setReason(parsed.reason);
            setInput(parsed.input || '');
          }
        } catch (e) {
          console.error("保存されたデータの読み込みに失敗しました", e);
          // 壊れたデータが入っている場合は削除しておく
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    }
  }, []);

  const handleSearch = async () => {
    if (!input.trim()) return;
    
    setLoading(true);
    setResult(null);
    setReason(null);
  
    // URLパラメータを取得（なければデフォルト値を設定）
    // 例: /map?lat=34.6841376&lng=135.8285414&time=1830
    const latParam = searchParams.get("lat");
    const lngParam = searchParams.get("lng");
    const timeParam = searchParams.get("time");
  
    // デフォルト: 近鉄奈良駅
    const lat = parseCoords(latParam, 34.6841376);
    const lng = parseCoords(lngParam, 135.8285414);
    
    // デフォルト: "1800" (18:00)
    const targetTime = parseTime(timeParam, "1800");

    try {
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          query: input,
          centerLat: lat,
          centerLng: lng,
          targetTime
        }),
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await res.json();
      if (data.spot) {
        setResult(data.spot);
        setReason(data.reason);
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          result: data.spot,
          reason: data.reason,
          input: input
        }));
      } else {
        // スポットが見つからなかった場合（APIが空を返した、徒歩範囲以外の場合など）
        alert(`該当するスポットが見つかりませんでした。別の要望でお試しください。理由: ${data.reason || ''}`);
      }

    } catch (e) {
      alert("検索に失敗しました。もう一度お試しください。");
    } finally {
      setLoading(false);
    }
  };

  // リセット（検索結果をクリアしてチャット画面に戻る）
  const handleReset = () => {
    setResult(null);
    setInput('');
    localStorage.removeItem(STORAGE_KEY);
  };

  // ----------------------------------------------------------------
  // 状態 1: ローディング中
  // ----------------------------------------------------------------
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[100dvh] bg-gray-50 z-50">
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
      <div className="relative w-full h-[100dvh] overflow-hidden">
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
