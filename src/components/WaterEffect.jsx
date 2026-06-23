import { useMemo } from "react";
import "../css/Types.css";

export function WaterEffect() {
  const bubbles = useMemo(() => {
    // Generamos 40 burbujas para poblar bien el fondo
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      // Posición horizontal inicial
      left: `${Math.random() * 100}vw`,
      // Tamaños muy variados, desde burbujitas hasta algunas grandes
      size: `${5 + Math.random() * 35}px`,
      // Suben más lento que el fuego (entre 4 y 10 segundos)
      duration: `${4 + Math.random() * 6}s`,
      // Retraso para que el flujo sea constante
      delay: `${Math.random() * 8}s`,
      // Cuánto se tambalean de izquierda a derecha al subir
      wobble: `${(Math.random() - 0.5) * 50}px`,
    }));
  }, []);

  return (
    <div className="water-effect-container">
      {/* Un ligero gradiente azul/celeste en el fondo para dar sensación de profundidad */}
      <div className="water-depth-tint" />

      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="bubble"
          style={{
            left: bubble.left,
            width: bubble.size,
            height: bubble.size,
            animationDuration: bubble.duration,
            animationDelay: bubble.delay,
            "--wobble": bubble.wobble,
          }}
        >
          {/* El brillo blanco en la esquina de la burbuja */}
          <div className="bubble-reflection" />
        </div>
      ))}
    </div>
  );
}
