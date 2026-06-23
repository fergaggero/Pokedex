import { useEffect, useState, useMemo } from "react";
import "../css/Types.css";

export function RockEffect() {
  const [cracking, setCracking] = useState(false);

  // Generamos escombros de roca aleatorios usando useMemo para no recalcular en cada render
  const debris = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => {
      // Diferentes formas irregulares para que parezcan pedazos de roca
      const clipPaths = [
        "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
        "polygon(50% 0%, 100% 25%, 80% 100%, 20% 100%, 0% 25%)",
        "polygon(0 0, 100% 20%, 80% 100%, 10% 80%)",
        "polygon(30% 0, 100% 10%, 70% 100%, 0 80%)",
      ];

      return {
        id: i,
        size: 20 + Math.random() * 40, // Tamaño entre 20px y 60px
        left: `${40 + Math.random() * 20}%`, // Origen horizontal (cerca del centro)
        top: `${20 + Math.random() * 40}%`, // Origen vertical (mitad superior)

        // Variables CSS personalizadas para la física de la explosión
        tx: `${(Math.random() - 0.5) * 800}px`, // Vuelan hacia la izq o der
        ty: `${(Math.random() + 0.2) * 800}px`, // Vuelan hacia abajo (gravedad)
        rot: `${(Math.random() - 0.5) * 720}deg`, // Rotación caótica
        clip: clipPaths[Math.floor(Math.random() * clipPaths.length)],
        delay: Math.random() * 0.15, // Pequeño retraso para que no salgan todas a la vez
      };
    });
  }, []);

  useEffect(() => {
    let timer;

    const trigger = () => {
      setCracking(true);

      // La animación dura 1.5s, luego limpiamos los escombros
      setTimeout(() => {
        setCracking(false);
      }, 1500);

      // Repetir el quiebre cada 3-6 segundos
      timer = setTimeout(trigger, 3000 + Math.random() * 3000);
    };

    trigger();

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`rock-effect-container ${cracking ? "active" : ""}`}>
      {/* 1. LA GRIETA: Un SVG invisible que se dibuja con CSS */}
      {cracking && (
        <svg
          className="crack-line"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            d="M 50,0 L 45,15 L 55,30 L 40,45 L 60,65 L 45,85 L 50,100"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M 55,30 L 75,45 L 65,60 L 90,80"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M 40,45 L 20,40 L 25,60 L 5,75"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      )}

      {/* 2. LOS ESCOMBROS: Divs que salen disparados */}
      {cracking &&
        debris.map((rock) => (
          <div
            key={rock.id}
            className="rock-debris"
            style={{
              width: `${rock.size}px`,
              height: `${rock.size}px`,
              left: rock.left,
              top: rock.top,
              clipPath: rock.clip,
              // Pasamos las físicas al CSS
              "--tx": rock.tx,
              "--ty": rock.ty,
              "--rot": rock.rot,
              animationDelay: `${rock.delay}s`,
            }}
          />
        ))}
    </div>
  );
}
