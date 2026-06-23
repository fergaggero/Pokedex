import { useMemo } from "react";
import "../css/Types.css";

export function DarkEffect() {
  return (
    <div className="dark-effect-container">
      {/* 4 anillos que crean el patrón de abismo */}
      {[...Array(4)].map((_, i) => (
        <div key={i} className="dark-ring" />
      ))}
    </div>
  );
}
