// app/components/RecommendChat.tsx
import Image from 'next/image';
import { Search } from 'lucide-react';

type RecommendChatProps = {
    input: string;
    setInput: (input: string) => void;
    handleSearch: () => void;
};

export const RecommendChat = ({ input, setInput, handleSearch }: RecommendChatProps) => {
    return (
        <div className="flex flex-col items-center justify-center h-[100dvh] bg-[#f8f5e3] p-4">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8 w-full max-w-3xl px-4">
                {/* 画像ブロック */}
                <div className="flex-shrink-0">
                    <Image
                        src="/ShikAI.png" // publicフォルダ内の画像パスを指定
                        alt="ShikAIのアイコン"
                        width={120} // 表示したい幅（px）
                        height={120} // 表示したい高さ（px）
                        className="rounded-2xl shadow-sm object-cover" // お好みでスタイルを調整
                        priority // ファーストビューに入る重要な画像なので優先的に読み込む
                    />
                </div>

                {/* テキストブロック */}
                <div className="text-center md:text-left">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2 leading-tight">
                        S-AI
                    </h1>
                    <p className="text-gray-500">
                        S-AIがひらく、奈良の新たな視界
                    </p>
                </div>
            </div>

            <div className="w-full max-w-2xl bg-white p-2 rounded-xl shadow-lg border border-gray-200 flex gap-2 items-center">
                <textarea
                    rows={1}
                    className="flex-1 resize-none p-2 md:p-4 overflow-y-auto max-h-24"
                    placeholder="例: 鹿を見ながらコーヒーが飲みたい"
                    value={input}
                    onChange={(e) => {
                        setInput(e.target.value);
                        e.target.style.height = "auto";
                        e.target.style.height = `${e.target.scrollHeight}px`;
                    }}
                />
                <button
                    onClick={handleSearch}
                    className="flex-shrink-0 whitespace-nowrap px-4 py-2 md:px-8 md:py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition flex items-center gap-2 text-sm md:text-base"
                >
                    <Search size={17} />
                </button>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 text-sm text-gray-500 w-full max-w-2xl">
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
