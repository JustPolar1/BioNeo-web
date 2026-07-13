export function Neutral() {
  return (
    <svg viewBox="0 0 120 140" className="h-40 w-40 absolute" xmlns="http://www.w3.org/2000/svg">
      {/* Ojos */}
      <circle cx="40" cy="80" r="4" fill="#2c2c2c" />
      <circle cx="80" cy="80" r="4" fill="#2c2c2c" />
      
      {/* Mejillas (blusas) */}
      <circle cx="25" cy="95" r="5" fill="#ff9999" opacity="0.6" />
      <circle cx="95" cy="95" r="5" fill="#ff9999" opacity="0.6" />
      
      {/* Boca neutral */}
      <line x1="50" y1="105" x2="70" y2="105" stroke="#2c2c2c" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function Happy() {
  return null;
}

export function Sad() {
  return null;
}

export function Sleepy() {
  return null;
}

export default function Expressions({ emotion = "neutral" }) {
  const expressions = {
    neutral: <Neutral />,
    happy: <Happy />,
    sad: <Sad />,
    sleepy: <Sleepy />,
  };

  return expressions[emotion] ?? expressions.neutral;
}

