import { EvolutionNode } from "./EvolutionNode";

export function EvolutionTree({ chain }) {
  if (!chain) return null;

  return (
    <div className="evolution-tree">
      <EvolutionNode node={chain} />
    </div>
  );
}
