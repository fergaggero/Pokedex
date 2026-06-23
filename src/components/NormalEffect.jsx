import { useMemo } from "react";
import "../css/Types.css";

export function NormalEffect() {
  const motes = useMemo(() => {
    // 25 motas es suficiente para un fondo sutil
    return Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}vw`,
      size: `${1 + Math.random() * 2}px`,
      duration: `${15 + Math.random() * 15}s`, // Aún más lento para mayor calma
      delay: `-${Math.random() * 30}s`,
    }));
  }, []);

  return (
    <div className="normal-effect-container">
      {motes.map((m) => (
        <div
          key={m.id}
          className="mote"
          style={{
            left: m.left,
            width: m.size,
            height: m.size,
            animationDuration: m.duration,
            animationDelay: m.delay,
          }}
        />
      ))}
    </div>
  );
}
