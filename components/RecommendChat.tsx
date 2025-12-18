// app/components/RecommendChat.tsx

import { Search } from 'lucide-react';

type RecommendChatProps = {
    input: string;
    setInput: (input: string) => void;
    handleSearch: () => void;
};

export const RecommendChat = ({ input, setInput, handleSearch }: RecommendChatProps) => {
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
