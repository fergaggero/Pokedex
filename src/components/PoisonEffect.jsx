import { useMemo } from "react";
import "../css/Types.css";

export function PoisonEffect() {
  const bubbles = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}vw`,
      size: `${10 + Math.random() * 30}px`,
      duration: `${3 + Math.random() * 4}s`,
      delay: `-${Math.random() * 5}s`,
    }));
  }, []);

  return (
    <div className="poison-effect-container">
      {bubbles.map((b) => (
        <div
          key={b.id}
          className="poison-bubble"
          style={{
            left: b.left,
            width: b.size,
            height: b.size,
            animationDuration: b.duration,
            animationDelay: b.delay,
          }}
        />
      ))}
    </div>
  );
}
