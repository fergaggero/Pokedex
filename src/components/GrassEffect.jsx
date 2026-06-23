import { useMemo } from "react";
import "../css/Types.css";

export function GrassEffect() {
  const leaves = useMemo(() => {
    // Generamos 45 hojas para una tormenta densa
    return Array.from({ length: 25 }).map((_, i) => {
      // Simulamos viento de derecha a izquierda
      // Empiezan más a la derecha (hasta un 150% del ancho)
      const startX = Math.random() * 150;
      // Terminan desplazadas hacia la izquierda
      const endX = startX - (30 + Math.random() * 50);

      return {
        id: i,
        // Pasamos estos valores al CSS mediante variables personalizadas
        startX: `${startX}vw`,
        endX: `${endX}vw`,
        delay: `${Math.random() * 5}s`, // Para que no caigan todas a la vez
        duration: `${2 + Math.random() * 3}s`, // Caen rápido (entre 2 y 5 seg)
        scale: 0.4 + Math.random() * 0.8, // Tamaños variados
        rotStart: `${Math.random() * 360}deg`,
        rotEnd: `${(Math.random() > 0.5 ? 1 : -1) * (360 + Math.random() * 720)}deg`, // Giran mucho
      };
    });
  }, []);

  return (
    <div className="grass-effect-container">
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="leaf-wrapper"
          style={{
            "--start-x": leaf.startX,
            "--end-x": leaf.endX,
            "--delay": leaf.delay,
            "--duration": leaf.duration,
            "--scale": leaf.scale,
            "--rot-start": leaf.rotStart,
            "--rot-end": leaf.rotEnd,
          }}
        >
          {/* Este div será la forma visual de la hoja */}
          <div className="leaf-shape"></div>
        </div>
      ))}
    </div>
  );
}
