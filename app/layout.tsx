import "leaflet/dist/leaflet.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ψナラ",
  description: "奈良旅行にΨ高のラストワンマイルを",
  formatDetection: {
    telephone: false, // 緯度経度が電話番号と認識されるのを防ぐ
  },
  icons: {
    icon: '/SaiNara.png', // publicフォルダ内のパス
    apple: '/SaiNara.png', // スマホ用も設定する場合
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
