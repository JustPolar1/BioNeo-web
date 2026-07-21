export default function CharacterPart({
  children,
  layout,
}) {
  return (
    <div
      className="absolute"
      style={{
        left: `${layout.x}%`,
        top: `${layout.y}%`,
        width: `${layout.width}%`,
        height: `${layout.height}%`,
      }}
    >
      {children}
    </div>
  );
}