// app/components/TimeLimitCircle.tsx
import { useEffect, useState } from "react";
import { Circle } from "react-leaflet";

import { calculateRadiusFromTime } from "@/lib/utils";

type TimeLimitCircleProps = {
  center: [number, number];
  targetTime: string; // "1430などの4桁で14:30という時間を示す"
};

export const TimeLimitCircle = ({ center, targetTime }: TimeLimitCircleProps) => {
  const [radius, setRadius] = useState(500);
  const [color, setColor] = useState("blue");
  const [remainingMinutes, setRemainingMinutes] = useState(30);
  const [ripples, setRipples] = useState<number[]>([0, 0.33, 0.66]); // 3つの波紋

  useEffect(() => {
    const calcRadiusFromTime = () => {
      const {remainingMinutes: mins, calcRadius} = calculateRadiusFromTime(targetTime, 50);
      
      if (mins > 0) {
        setRadius(calcRadius);
        setRemainingMinutes(mins);
        if (mins >= 30) {
          setColor("blue");
        } else if (mins >= 15) {
          setColor("#ffd700"); 
        } else {
          setColor("red");
        }
      } else {
        setRadius(0);
      }
    };

    calcRadiusFromTime();
    const interval = setInterval(calcRadiusFromTime, 10 * 1000);

    return () => clearInterval(interval);
  }, [targetTime]); 

  // 波紋アニメーション（時間が迫るほど速く）
  useEffect(() => {
    const speed = remainingMinutes < 15 ? 30 : remainingMinutes < 30 ? 50 : 80;
    
    const rippleInterval = setInterval(() => {
      setRipples(prev => prev.map(r => (r + 0.01) % 1));
    }, speed);

    return () => clearInterval(rippleInterval);
  }, [remainingMinutes]);

  return (
    <>
      {/* メインの円 */}
      <Circle
        center={center}
        radius={radius}
        pathOptions={{
          color: color,
          fillColor: color,
          fillOpacity: 0.1,
          weight: 2,
        }}
      />
      
      {/* 波紋エフェクト */}
      {ripples.map((phase, i) => (
        <Circle
          key={i}
          center={center}
          radius={radius * (0.7 + 0.3 * phase)} // 70%から100%に拡大
          pathOptions={{
            color: color,
            fillColor: "transparent",
            weight: 2,
            opacity: 0.5 * (1 - phase), // 外に行くほど薄く
          }}
        />
      ))}
    </>
  );
};
