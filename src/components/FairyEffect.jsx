import { useMemo } from "react";
import "../css/Types.css";

export function FairyEffect() {
  const fairies = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      size: `${4 + Math.random() * 8}px`,
      // Retraso para que aparezcan escalonadas
      delay: `${Math.random() * 6}s`,
      // Duración larga para un movimiento elegante
      duration: `${6 + Math.random() * 6}s`,
      // Ángulo inicial para dispersión
      angle: `${Math.random() * 360}deg`,
    }));
  }, []);

  return (
    <div className="fairy-effect-container">
      {fairies.map((f) => (
        <div
          key={f.id}
          className="fairy-particle"
          style={{
            width: f.size,
            height: f.size,
            animationDelay: f.delay,
            animationDuration: f.duration,
            "--angle": f.angle,
          }}
        />
      ))}
    </div>
  );
}
