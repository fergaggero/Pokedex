import { useMemo } from "react";
import "../css/Types.css";

export function GhostEffect() {
  const wisps = useMemo(() => {
    // 20 formas nebulosas son suficientes porque serán muy grandes
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      // Se distribuyen por toda la pantalla
      left: `${-10 + Math.random() * 120}vw`,
      top: `${-10 + Math.random() * 120}vh`,
      // Tamaños enormes (entre 150px y 450px) para crear la base de la niebla
      size: `${150 + Math.random() * 300}px`,
      // Movimiento extremadamente lento y perezoso (entre 15 y 30 segundos)
      duration: `${15 + Math.random() * 15}s`,
      // ¡TRUCO CLAVE! Delay negativo para que la niebla ya esté en pantalla al cargar
      delay: `-${Math.random() * 30}s`,
      // Hacia dónde se desplazarán
      tx: `${(Math.random() - 0.5) * 50}vw`,
      ty: `${(Math.random() - 0.5) * 50}vh`,
    }));
  }, []);

  return (
    <div className="ghost-effect-container">
      {/* Capa base para oscurecer el fondo general */}
      <div className="ghost-darkness-base" />

      {/* El efecto de viñeta (bordes oscuros) */}
      <div className="ghost-vignette" />

      {wisps.map((wisp) => (
        <div
          key={wisp.id}
          className="ghost-wisp"
          style={{
            left: wisp.left,
            top: wisp.top,
            width: wisp.size,
            height: wisp.size,
            animationDuration: wisp.duration,
            animationDelay: wisp.delay,
            "--tx": wisp.tx,
            "--ty": wisp.ty,
          }}
        />
      ))}
    </div>
  );
}
