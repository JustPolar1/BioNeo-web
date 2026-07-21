export function Neutral() {
  return (
    <svg
      viewBox="0 0 120 140"
      className="w-full h-full"
    >
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
  return (
    <svg
      viewBox="0 0 120 140"
      className="w-full h-full"
    >
      {/* Ojos felices (arcos cerrados) */}
      <path d="M 34 83 Q 40 73 46 83" fill="none" stroke="#2c2c2c" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M 74 83 Q 80 73 86 83" fill="none" stroke="#2c2c2c" strokeWidth="3.5" strokeLinecap="round" />
      
      {/* Mejillas sonrojadas */}
      <circle cx="25" cy="95" r="6" fill="#ff9999" opacity="0.7" />
      <circle cx="95" cy="95" r="6" fill="#ff9999" opacity="0.7" />
      
      {/* Boca kawaii (:3) */}
      <path d="M 50 100 Q 55 107 60 100 Q 65 107 70 100" fill="none" stroke="#2c2c2c" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function Sad() {
  return null;
}

export function Sleepy() {
  return null;
}

export default function Expressions({ emotion = "happy" }) {
  const expressions = {
    neutral: <Neutral />,
    happy: <Happy />,
    sad: <Sad />,
    sleepy: <Sleepy />,
  };

  return expressions[emotion] ?? expressions.neutral;
}

