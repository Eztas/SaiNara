// app/api/recommend/route.ts
import { NextResponse } from 'next/server';
import { GoogleGenAI } from "@google/genai";
import { allNaraRestSpots } from "@/lib/allSpots";

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    console.error("DEBUG: API Key is UNDEFINED!");
    return NextResponse.json({ error: "API Key is missing on server" }, { status: 500 });
  } else {
    console.log("DEBUG: Key starts with:", apiKey.substring(0, 5) + "...");
  }
  const genAI = new GoogleGenAI({ apiKey });
  try {
    // クライアントから送られてきたメッセージを取得
    const { query } = await request.json();

    if (!query) {
      return NextResponse.json(
        { error: "Query is required" }, 
        { status: 400 }
      );
    }

    const prompt = `
    あなたは奈良の観光ガイドAIです。
    提供されたスポットデータの中から、ユーザーの要望に最も合致するスポットを1つだけ選び出し、そのJSONデータをそのまま返してください。
    
    # ルール
    - 該当するスポットがない場合は null を返してください。
    - 出力はJSONのみとしてください。解説は不要です。
    - ユーザーの意図（「休憩したい」「充電したい」「Wi-Fiが欲しい」など）をタグや説明から推測してください。

    # 出力フォーマット（厳守）
    以下のJSON形式のみを出力してください。Markdownや解説は不要です。

    {
      "reason": "ユーザーへの推奨理由（30文字〜50文字程度の日本語。親しみやすい口調で。）",
      "spot": { ...選んだスポットのデータそのもの... }
    }
    # スポットデータリスト
    ${JSON.stringify(allNaraRestSpots)}

    # ユーザーの要望
    ${query}
    `;

    const response = await genAI.models.generateContent({
        model: "gemini-2.5-flash", // gemini-3-flash
        contents: prompt,
        config: {
            responseMimeType: "application/json",
        },
    });
    if (!response.text) {
        throw new Error("Gemini response has no text output");
    }
    const data = JSON.parse(response.text);

    console.log("DEBUG: Gemini response data:", data);

    return NextResponse.json(data);

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}
