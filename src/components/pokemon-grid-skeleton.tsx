export function PokemonGridSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="bg-zinc-900 rounded-xl h-36 animate-pulse"
        />
      ))}
    </div>
  );
}
