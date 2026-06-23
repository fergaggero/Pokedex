import { useEffect, useState } from "react";
import "../css/Types.css";

export function SteelEffect() {
  const [slash, setSlash] = useState(false);

  useEffect(() => {
    let timer;
    const trigger = () => {
      setSlash(true);
      setTimeout(() => setSlash(false), 800);
      timer = setTimeout(trigger, 2000 + Math.random() * 3000);
    };
    trigger();
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`steel-effect-container ${slash ? "active" : ""}`}>
      {slash && <div className="steel-slash" />}
    </div>
  );
}
