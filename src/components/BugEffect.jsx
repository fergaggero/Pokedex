import { useMemo } from "react";
import "../css/Types.css";

export function BugEffect() {
  const spores = useMemo(() => {
    // Unas pocas motitas de polvo/esporas flotando para darle vida
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}vw`,
      top: `${Math.random() * 100}vh`,
      size: `${1 + Math.random() * 3}px`,
      duration: `${10 + Math.random() * 15}s`,
      delay: `-${Math.random() * 10}s`,
      tx: `${(Math.random() - 0.5) * 40}vw`,
      ty: `${(Math.random() - 0.5) * 40}vh`,
    }));
  }, []);

  return (
    <div className="bug-effect-container">
      {/* Telaraña Esquina Superior Izquierda */}
      <svg
        className="spider-web web-top-left"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMinYMin meet"
      >
        <g className="web-lines">
          {/* Líneas radiales */}
          <line x1="0" y1="0" x2="100" y2="0" />
          <line x1="0" y1="0" x2="90" y2="40" />
          <line x1="0" y1="0" x2="70" y2="70" />
          <line x1="0" y1="0" x2="40" y2="90" />
          <line x1="0" y1="0" x2="0" y2="100" />
          {/* Hilos conectores */}
          <path d="M 25,0 L 23,10 L 17,17 L 10,23 L 0,25" />
          <path d="M 50,0 L 45,20 L 35,35 L 20,45 L 0,50" />
          <path d="M 75,0 L 68,30 L 52,52 L 30,68 L 0,75" />
          <path d="M 100,0 L 90,40 L 70,70 L 40,90 L 0,100" />
        </g>
      </svg>

      {/* Telaraña Esquina Inferior Derecha (Invertida) */}
      <svg
        className="spider-web web-bottom-right"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMaxYMax meet"
      >
        <g className="web-lines">
          <line x1="100" y1="100" x2="0" y2="100" />
          <line x1="100" y1="100" x2="10" y2="60" />
          <line x1="100" y1="100" x2="30" y2="30" />
          <line x1="100" y1="100" x2="60" y2="10" />
          <line x1="100" y1="100" x2="100" y2="0" />
          <path d="M 75,100 L 77,90 L 83,83 L 90,77 L 100,75" />
          <path d="M 50,100 L 55,80 L 65,65 L 80,55 L 100,50" />
          <path d="M 25,100 L 32,70 L 48,48 L 70,32 L 100,25" />
          <path d="M 0,100 L 10,60 L 30,30 L 60,10 L 100,0" />
        </g>
      </svg>

      {/* Esporas flotantes de fondo */}
      {spores.map((spore) => (
        <div
          key={spore.id}
          className="bug-spore"
          style={{
            left: spore.left,
            top: spore.top,
            width: spore.size,
            height: spore.size,
            animationDuration: spore.duration,
            animationDelay: spore.delay,
            "--tx": spore.tx,
            "--ty": spore.ty,
          }}
        />
      ))}
    </div>
  );
}
