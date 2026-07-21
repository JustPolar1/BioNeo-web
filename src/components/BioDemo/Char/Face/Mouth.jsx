export default function Mouth({ variant = "neutral" }) {
  switch (variant) {
    case "happy":
      return (
        <path
          d="M 50 100 Q 55 107 60 100 Q 65 107 70 100"
          fill="none"
          stroke="#2c2c2c"
          strokeWidth="3"
          strokeLinecap="round"
        />
      );

    case "sleepy":
      return (
        <path
          d="M55 103 Q60 106 65 103"
          fill="none"
          stroke="#2c2c2c"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      );

    case "sad":
      return (
        <path
          d="M50 108 Q60 100 70 108"
          fill="none"
          stroke="#2c2c2c"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      );

    default:
      return (
        <line
          x1="50"
          y1="105"
          x2="70"
          y2="105"
          stroke="#2c2c2c"
          strokeWidth="2"
          strokeLinecap="round"
        />
      );
  }
}