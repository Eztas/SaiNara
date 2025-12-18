// app/recommend/page.tsx
'use client';

import { useState } from 'react';

export default function SpotSearchPage() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!input.trim()) return;
    
    setLoading(true);
    setResult(null);

    try {
      // 作成したAPIルートを叩く
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
      setResult({ error: "データの取得に失敗しました" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* --- 画面上部: チャット入力エリア --- */}
      <div className="w-full bg-white border-b border-gray-200 p-4 shadow-sm z-10">
        <div className="max-w-2xl mx-auto flex gap-2">
          <input
            type="text"
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            placeholder="例: 奈良公園の鹿を見ながら休憩できる場所ある？"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {loading ? '検索中...' : '送信'}
          </button>
        </div>
      </div>

      {/* --- 画面下部: 出力エリア --- */}
      <div className="flex-1 overflow-auto p-4 flex justify-center items-start">
        <div className="w-full max-w-2xl bg-gray-900 text-green-400 p-6 rounded-lg font-mono shadow-lg text-sm whitespace-pre-wrap min-h-[300px]">
          {loading && (
            <div className="animate-pulse">Thinking...</div>
          )}
          
          {!loading && result && (
            <>
              {/* 整形されたJSONを表示 */}
              {JSON.stringify(result, null, 2)}
            </>
          )}

          {!loading && !result && (
            <span className="text-gray-500">ここに検索結果の生データが表示されます...</span>
          )}
        </div>
      </div>
    </div>
  );
}