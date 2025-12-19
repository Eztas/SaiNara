// app/api/recommend/route.ts
import { NextResponse } from 'next/server';
import { GoogleGenAI } from "@google/genai";
import { allNaraRestSpots } from "@/lib/allSpots";

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "API Key is missing on server" }, { status: 500 });
  }
  const genAI = new GoogleGenAI({ apiKey });
  try {
    // クライアントから送られてきたメッセージを取得
    const { query, centerLat, centerLng, targetTime } = await request.json();

    if (!query) {
      return NextResponse.json(
        { error: "Query is required" }, 
        { status: 400 }
      );
    }

    const prompt = `
      あなたは奈良の観光ガイドAIです。
      以下の条件を必ず厳守してください。

      # 目的
      ユーザーの要望に最も合致する「1つのスポット」を選びます。

      # 制約（重要）
      - あなたが選んでよいスポットは、以下の【スポットデータリスト】に含まれるもののみです
      - 中心座標 (centerLat, centerLng) から「徒歩で到達可能な範囲」にあるスポットのみを選んでください
      - 徒歩可能範囲は、targetTime までの残り時間から判断してください
      - 徒歩可能範囲の計算は、旅行終わり終盤で疲れていること、道が曲がりくねっていることを考慮し、歩行速度を50m/分として計算してください
      - 徒歩で到達できないと判断したスポットは、どれだけ魅力的でも絶対に選ばないでください
      - 条件を満たすスポットが1つもない場合は、spot を null にして、なぜないのかをreasonに説明してください

      # 出力ルール
      - 出力は **JSONのみ**
      - Markdown、説明文、コメントは禁止
      - フォーマットは必ず以下に一致させてください

      {
        "reason": "ユーザーへの推奨理由（30〜50文字程度、日本語、親しみやすい口調）",
        "spot": { ...スポットのJSONデータ... } または null
      }

      # 中心情報
      - centerLat: ${centerLat}
      - centerLng: ${centerLng}
      - targetTime: ${targetTime}

      # スポットデータリスト
      ${JSON.stringify(allNaraRestSpots)}

      # ユーザーの要望
      ${query}
    `;

    const response = await genAI.models.generateContent({
        model: process.env.GEMMINI_AI_MODEL || "gemini-3-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
        },
    });
    if (!response.text) {
        throw new Error("Gemini response has no text output");
    }
    const data = JSON.parse(response.text);
    return NextResponse.json(data);

  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}
