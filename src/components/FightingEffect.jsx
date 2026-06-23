import { useEffect, useState } from "react";
import "../css/Types.css";

export function FightingEffect() {
  const [hit, setHit] = useState(null);

  useEffect(() => {
    let timer;

    const trigger = () => {
      // Generamos coordenadas aleatorias para el impacto (evitando los bordes extremos)
      setHit({
        id: Date.now(),
        x: `${20 + Math.random() * 60}%`,
        y: `${20 + Math.random() * 60}%`,
      });

      // ¡TRUCO CLAVE! Le aplicamos el temblor a todo el body de la página
      document.body.classList.add("shake");

      // Limpiamos el golpe y el temblor después de 250ms
      setTimeout(() => {
        setHit(null);
        document.body.classList.remove("shake");
      }, 250);

      // Programar el siguiente golpe
      timer = setTimeout(trigger, 2000 + Math.random() * 4000);
    };

    trigger();

    return () => {
      clearTimeout(timer);
      document.body.classList.remove("shake"); // Limpiar al desmontar
    };
  }, []);

  return (
    <div className={`impact-overlay ${hit ? "active" : ""}`}>
      {/* Renderizamos el anillo de impacto solo cuando hay un golpe */}
      {hit && (
        <div
          className="fighting-ring active"
          style={{ left: hit.x, top: hit.y }}
        />
      )}
    </div>
  );
}
