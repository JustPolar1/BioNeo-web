export default function Background() {
  return (
    <div className="absolute inset-0 rounded-2xl overflow-hidden">
      {/* Fondo degradado simple */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-700" />
      
      {/* Luz sutil en la esquina */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
    </div>
  );
}
