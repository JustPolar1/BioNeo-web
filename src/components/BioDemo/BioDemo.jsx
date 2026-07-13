import Background from "./Background";
import Char from "./Char/Char";

export default function BioDemo() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-emerald-950/90 p-4 shadow-lg h-96 w-full">
      <Background />
      <div className="relative flex h-full items-center justify-center">
        <Char />
      </div>
    </div>
  );
}