import { useMemo } from "react";
import "../css/Types.css";

export function FireEffect() {
  const embers = useMemo(() => {
    // 60 brasas para un efecto continuo y envolvente
    return Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      // Posición horizontal inicial aleatoria
      left: `${Math.random() * 100}vw`,
      // Tamaños pequeños, entre 2px y 7px
      size: `${2 + Math.random() * 5}px`,
      // Duración de la subida (entre 3 y 7 segundos)
      duration: `${3 + Math.random() * 4}s`,
      // Retraso para que no salgan todas al mismo tiempo
      delay: `${Math.random() * 5}s`,
      // Desvío horizontal mientras suben (corriente de aire)
      drift: `${(Math.random() - 0.5) * 150}px`,
    }));
  }, []);

  return (
    <div className="fire-effect-container">
      {/* Un ligero resplandor naranja en la base de la pantalla */}
      <div className="fire-glow-base" />

      {embers.map((ember) => (
        <div
          key={ember.id}
          className="ember-particle"
          style={{
            left: ember.left,
            width: ember.size,
            height: ember.size,
            animationDuration: ember.duration,
            animationDelay: ember.delay,
            "--drift": ember.drift,
          }}
        />
      ))}
    </div>
  );
}
