import { useMemo } from "react";
import { createPortal } from "react-dom";
import { BugEffect } from "./BugEffect";
import { DarkEffect } from "./DarkEffect";
import { DragonEffect } from "./DragonEffect";
import { FairyEffect } from "./FairyEffect";
import { FightingEffect } from "./FightingEffect";
import { FireEffect } from "./FireEffect";
import { FlyingEffect } from "./FlyingEffect";
import { GhostEffect } from "./GhostEffect";
import { GrassEffect } from "./GrassEffect";
import { IceEffect } from "./IceEffect";
import { LightningEffect } from "./LightningEffect";
import { NormalEffect } from "./NormalEffect";
import { PoisonEffect } from "./PoisonEffect";
import { PsychicEffect } from "./PsychicEffect";
import { RockEffect } from "./RockEffect";
import { SandstormEffect } from "./SandstormEffect";
import { SteelEffect } from "./SteelEffect";
import { WaterEffect } from "./WaterEffect";
import "../css/Types.css";

const effectConfig = {
  ice: {
    count: 40,
    className: "particle-ice",
    content: "❄",
  },
  ground: {
    count: 60,
    className: "particle-sand",
    content: "",
  },
  fairy: {
    count: 20,
    className: "particle-heart",
    content: "🩷",
  },
  default: {
    count: 30,
    className: "particle-default",
    content: "",
  },
};

// Componente Wrapper para el Portal (opcional pero limpio)
function FullScreenEffectPortal({ children }) {
  // Renderizamos directamente en el document.body para asegurar que ocupe todo
  return createPortal(children, document.body);
}

export function PokemonBackgroundEffect({ type, color }) {
  if (type === "bug") {
    return (
      <FullScreenEffectPortal>
        <BugEffect />
      </FullScreenEffectPortal>
    );
  }

  if (type === "dark") {
    return (
      <FullScreenEffectPortal>
        <DarkEffect />
      </FullScreenEffectPortal>
    );
  }

  if (type === "dragon") {
    return (
      <FullScreenEffectPortal>
        <DragonEffect />
      </FullScreenEffectPortal>
    );
  }

  if (type === "electric") {
    return (
      <FullScreenEffectPortal>
        <LightningEffect />
      </FullScreenEffectPortal>
    );
  }

  if (type === "fairy") {
    return (
      <FullScreenEffectPortal>
        <FairyEffect />
      </FullScreenEffectPortal>
    );
  }

  if (type === "fighting") {
    return (
      <FullScreenEffectPortal>
        <FightingEffect />
      </FullScreenEffectPortal>
    );
  }

  if (type === "fire") {
    return (
      <FullScreenEffectPortal>
        <FireEffect />
      </FullScreenEffectPortal>
    );
  }

  if (type === "flying") {
    return (
      <FullScreenEffectPortal>
        <FlyingEffect />
      </FullScreenEffectPortal>
    );
  }

  if (type === "ghost") {
    return (
      <FullScreenEffectPortal>
        <GhostEffect />
      </FullScreenEffectPortal>
    );
  }

  if (type === "grass") {
    return (
      <FullScreenEffectPortal>
        <GrassEffect />
      </FullScreenEffectPortal>
    );
  }

  if (type === "ground") {
    return (
      <FullScreenEffectPortal>
        <SandstormEffect />
      </FullScreenEffectPortal>
    );
  }

  if (type === "ice") {
    return (
      <FullScreenEffectPortal>
        <IceEffect />
      </FullScreenEffectPortal>
    );
  }

  if (type === "normal") {
    return (
      <FullScreenEffectPortal>
        <NormalEffect />
      </FullScreenEffectPortal>
    );
  }

  if (type === "poison") {
    return (
      <FullScreenEffectPortal>
        <PoisonEffect />
      </FullScreenEffectPortal>
    );
  }

  if (type === "psychic") {
    return (
      <FullScreenEffectPortal>
        <PsychicEffect />
      </FullScreenEffectPortal>
    );
  }

  if (type === "rock") {
    return (
      <FullScreenEffectPortal>
        <RockEffect />
      </FullScreenEffectPortal>
    );
  }

  if (type === "steel") {
    return (
      <FullScreenEffectPortal>
        <SteelEffect />
      </FullScreenEffectPortal>
    );
  }

  if (type === "water") {
    return (
      <FullScreenEffectPortal>
        <WaterEffect />
      </FullScreenEffectPortal>
    );
  }

  const config = effectConfig[type] || effectConfig.default;

  const particles = useMemo(
    () =>
      Array.from({ length: config.count }, (_, index) => ({
        id: index,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: `${4 + Math.random() * 10}px`,
        delay: `${Math.random() * 5}s`,
        duration: `${5 + Math.random() * 5}s`,
      })),
    [type],
  );

  const isDefault = config.className === "particle-default";

  return (
    <div className="effect-container">
      {particles.map((particle) => (
        <span
          key={particle.id}
          className={config.className}
          style={{
            "--particle-color": color,

            left: particle.left,

            top:
              type === "fire" || type === "ground" || isDefault
                ? particle.top
                : undefined,

            width:
              type === "fire" ||
              type === "water" ||
              type === "ground" ||
              isDefault
                ? particle.size
                : undefined,

            height:
              type === "fire" ||
              type === "water" ||
              type === "ground" ||
              isDefault
                ? particle.size
                : undefined,

            fontSize:
              type === "grass" || type === "ice" ? particle.size : undefined,

            animationDelay: particle.delay,
            animationDuration: particle.duration,
          }}
        >
          {config.content}
        </span>
      ))}
    </div>
  );
}
