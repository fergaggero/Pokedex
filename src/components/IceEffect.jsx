import { useMemo } from "react";
import "../css/Types.css";

export function IceEffect() {
  const snowflakes = useMemo(() => {
    // 80 partículas para una ventisca densa
    return Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      // Nacen a lo ancho de la pantalla y más allá del borde derecho
      left: `${Math.random() * 150}vw`,
      // Tamaños variables, desde polvillo hasta copos grandes
      size: `${2 + Math.random() * 6}px`,
      // ¡Muy rápido! Cruzan la pantalla entre 0.8 y 2.5 segundos
      duration: `${0.8 + Math.random() * 1.7}s`,
      // Retraso negativo para que la tormenta ya esté activa al cargar
      delay: `-${Math.random() * 5}s`,
      // Distinta opacidad para dar sensación de profundidad
      opacity: 0.3 + Math.random() * 0.7,
    }));
  }, []);

  return (
    <div className="ice-effect-container">
      {/* La niebla densa de la ventisca */}
      <div className="blizzard-fog" />

      {snowflakes.map((snow) => (
        <div
          key={snow.id}
          className="snowflake"
          style={{
            left: snow.left,
            width: snow.size,
            height: snow.size,
            opacity: snow.opacity,
            animationDuration: snow.duration,
            animationDelay: snow.delay,
          }}
        />
      ))}
    </div>
  );
}
