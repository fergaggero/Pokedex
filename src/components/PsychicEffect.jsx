import { useMemo } from "react";
import "../css/Types.css";

export function PsychicEffect() {
  // Generamos formas geométricas que levitan
  const telekineticShapes = useMemo(() => {
    const types = ["circle", "square"];
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      // Mitad círculos, mitad cuadrados (al rotar se verán como rombos)
      type: types[Math.floor(Math.random() * types.length)],
      // Tamaño variado
      size: `${20 + Math.random() * 50}px`,
      left: `${Math.random() * 100}vw`,
      top: `${Math.random() * 100}vh`,
      // Animaciones largas y fluidas (15-25 segundos)
      duration: `${15 + Math.random() * 10}s`,
      delay: `-${Math.random() * 20}s`, // Para que ya estén flotando
      // Altura a la que levitan hacia arriba y abajo
      floatOffset: `${30 + Math.random() * 50}px`,
      // Rotan a la derecha (1) o a la izquierda (-1)
      rotDir: Math.random() > 0.5 ? 1 : -1,
    }));
  }, []);

  return (
    <div className="psychic-effect-container">
      {/* Ondas Mentales Concéntricas */}
      <div className="mind-wave wave-1" />
      <div className="mind-wave wave-2" />
      <div className="mind-wave wave-3" />

      {/* Formas suspendidas por telequinesis */}
      {telekineticShapes.map((shape) => (
        <div
          key={shape.id}
          className={`psychic-shape ${shape.type}`}
          style={{
            left: shape.left,
            top: shape.top,
            width: shape.size,
            height: shape.size,
            animationDuration: shape.duration,
            animationDelay: shape.delay,
            "--float-offset": shape.floatOffset,
            "--rot-dir": shape.rotDir,
          }}
        />
      ))}
    </div>
  );
}
