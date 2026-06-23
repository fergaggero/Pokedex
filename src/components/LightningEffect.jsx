import { useEffect, useState } from "react";
import "../css/Types.css";

export function LightningEffect() {
  // Ahora manejamos una lista de rayos para que puedan caer varios a la vez
  const [strikes, setStrikes] = useState([]);

  useEffect(() => {
    let timer;

    const spawnLightning = () => {
      // Creamos un nuevo rayo con propiedades únicas
      const newStrike = {
        id: Date.now() + Math.random(), // ID único
        x: 10 + Math.random() * 80, // Posición horizontal (entre 10% y 90%)
        scale: 0.6 + Math.random() * 0.6, // Tamaño (escala entre 0.6 y 1.2)
        flipped: Math.random() > 0.5 ? -1 : 1, // Voltear horizontalmente al azar para dar variedad
      };

      // Lo agregamos a la pantalla
      setStrikes((prev) => [...prev, newStrike]);

      // Lo eliminamos exactamente cuando termina su animación (400ms)
      setTimeout(() => {
        setStrikes((prev) =>
          prev.filter((strike) => strike.id !== newStrike.id),
        );
      }, 400);

      // Programamos el siguiente rayo (caen más rápido, entre 0.5s y 2s)
      timer = setTimeout(spawnLightning, 500 + Math.random() * 1500);
    };

    spawnLightning();

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="lightning-effect-container">
      {strikes.map((strike) => (
        <div key={strike.id} className="strike-wrapper">
          {/* El destello ahora es individual por cada rayo */}
          <div className="lightning-flash" />

          {/* El rayo en sí */}
          <svg
            className="lightning-bolt"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{
              left: `${strike.x}%`,
              // Aplicamos la escala y la dirección aleatorias
              transform: `translateX(-50%) scaleX(${strike.flipped}) scaleY(${strike.scale})`,
              // Si el rayo es más pequeño, lo subimos un poco para que siempre venga del techo
              transformOrigin: "top center",
            }}
          >
            <path
              className="bolt-main"
              d="M 50,-10 L 35,40 L 55,45 L 20,110"
              vectorEffect="non-scaling-stroke"
            />
            <path
              className="bolt-branch"
              d="M 35,40 L 15,55 L 25,65"
              vectorEffect="non-scaling-stroke"
            />
            <path
              className="bolt-branch"
              d="M 55,45 L 75,55 L 65,70"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
