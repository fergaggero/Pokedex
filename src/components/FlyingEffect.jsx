import { useMemo } from "react";
import "../css/Types.css";

export function FlyingEffect() {
  const clouds = useMemo(() => {
    return Array.from({ length: 5 }).map((_, i) => ({
      id: i,
      // Posición vertical aleatoria
      top: `${10 + i * 15}%`,
      // Duración muy larga para que el movimiento sea elegante y lento
      duration: `${40 + i * 10}s`,
      delay: `-${i * 8}s`,
      scale: 0.8 + Math.random() * 0.5,
    }));
  }, []);

  return (
    <div className="flying-effect-container">
      {clouds.map((cloud) => (
        <div
          key={cloud.id}
          className="cloud"
          style={{
            top: cloud.top,
            animationDuration: cloud.duration,
            animationDelay: cloud.delay,
            transform: `scale(${cloud.scale})`,
          }}
        />
      ))}
    </div>
  );
}
