import { useMemo } from "react";
import "../css/Types.css";

export function SandstormEffect() {
  const grains = useMemo(() => {
    // 120 granos de arena volando a toda velocidad
    return Array.from({ length: 120 }).map((_, i) => ({
      id: i,
      // Distribuimos la arena a lo largo y ancho, incluyendo fuera de la pantalla a la derecha
      left: `${Math.random() * 150}vw`,
      top: `${-10 + Math.random() * 120}vh`,
      // Los granos son minúsculos (1px a 4px)
      size: `${1 + Math.random() * 3}px`,
      // Velocidad extrema (entre 0.4 y 1.5 segundos en cruzar la pantalla)
      duration: `${0.4 + Math.random() * 1.1}s`,
      // Retraso negativo para que ya estén en movimiento
      delay: `-${Math.random() * 5}s`,
      // Variación de opacidad
      opacity: 0.3 + Math.random() * 0.7,
    }));
  }, []);

  return (
    <div className="sandstorm-effect-container">
      {/* Esta capa simula nubes de polvo denso cruzando la pantalla */}
      <div className="dust-clouds" />

      {grains.map((grain) => (
        <div
          key={grain.id}
          className="sand-grain"
          style={{
            left: grain.left,
            top: grain.top,
            width: grain.size,
            height: grain.size,
            opacity: grain.opacity,
            animationDuration: grain.duration,
            animationDelay: grain.delay,
          }}
        />
      ))}
    </div>
  );
}
