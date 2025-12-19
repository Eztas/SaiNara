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
  const [urgency, setUrgency] = useState<"calm" | "warning" | "urgent">("calm");
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const calcRadiusFromTime = () => {
      const {remainingMinutes, calcRadius} = calculateRadiusFromTime(targetTime, 50);
      
      if (remainingMinutes > 0) {
        setRadius(calcRadius);
        if (remainingMinutes >= 30) {
          setColor("blue");
          setUrgency("calm");
        } else if (remainingMinutes >= 15) {
          setColor("#ffd700"); 
          setUrgency("warning");
        } else {
          setColor("red");
          setUrgency("urgent");
        }
      } else {
        setRadius(0);
      }
    };

    calcRadiusFromTime();
    const interval = setInterval(calcRadiusFromTime, 10 * 1000);

    return () => clearInterval(interval);
  }, [targetTime]); 

  // 緊急時は点滅
  useEffect(() => {
    if (urgency === "urgent") {
      const blinkInterval = setInterval(() => {
        setBlink(prev => !prev);
      }, 500); // 0.5秒ごと

      return () => clearInterval(blinkInterval);
    } else {
      setBlink(false);
    }
  }, [urgency]);

  const fillOpacity = urgency === "urgent" && blink ? 0.3 : 0.1;
  const weight = urgency === "urgent" && blink ? 3 : 2;

  return (
    <Circle
      center={center}
      radius={radius}
      pathOptions={{
        color: color,
        fillColor: color,
        fillOpacity: fillOpacity,
        weight: weight,
      }}
    />
  );
};
