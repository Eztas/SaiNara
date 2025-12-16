// app/components/TimeLimitCircle.tsx
import { useEffect, useState } from "react";
import { Circle } from "react-leaflet";

type TimeLimitCircleProps = {
  center: [number, number];
  targetTime: string; // "1430などの4桁で14:30という時間を示す"
};

export const TimeLimitCircle = ({ center, targetTime }: TimeLimitCircleProps) => {
  const [radius, setRadius] = useState(500);
  const [color, setColor] = useState("blue");

  // 時間から半径を計算するロジック（親から移動）
  useEffect(() => {
    const calcRadiusFromTime = () => {
      const now = new Date();
      const target = new Date();
      const hours = parseInt(targetTime.slice(0, 2), 10);
      const minutes = parseInt(targetTime.slice(2, 4), 10);

      target.setHours(hours, minutes, 0, 0);

      const diffSeconds = (target.getTime() - now.getTime()) / 1000;
      
      if (diffSeconds > 0) {
        const remainingMinutes = diffSeconds / 60;
        const calcRadius = remainingMinutes * 60; 
        setRadius(calcRadius);

        // 色の判定
        if (remainingMinutes >= 30) {
          setColor("blue");
        } else if (remainingMinutes >= 15) {
          // 15分以上 30分未満: 黄色(ゴールド)
          setColor("#ffd700"); 
        } else {
          setColor("red");
        }
      } else {
        setRadius(0); // 時間切れ
      }
    };

    // 初回実行
    calcRadiusFromTime();
  }, [targetTime]); 

  return (
    <Circle
      center={center}
      radius={radius}
      pathOptions={{
        color: color,
        fillColor: color,
        fillOpacity: 0.1,
      }}
    />
  );

};