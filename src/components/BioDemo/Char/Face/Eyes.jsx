export default function Eyes({ variant = "neutral" }) {
  switch (variant) {
    case "happy":
      return (
        <>
          <path
            d="M 34 83 Q 40 73 46 83"
            fill="none"
            stroke="#2c2c2c"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M 74 83 Q 80 73 86 83"
            fill="none"
            stroke="#2c2c2c"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </>
      );

    case "sleepy":
      return (
        <>
          <path
            d="M 34 80 Q 40 84 46 80"
            fill="none"
            stroke="#2c2c2c"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M 74 80 Q 80 84 86 80"
            fill="none"
            stroke="#2c2c2c"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </>
      );

    case "sad":
      return (
        <>
          <path
            d="M 34 82 Q 40 78 46 82"
            fill="none"
            stroke="#2c2c2c"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M 74 82 Q 80 78 86 82"
            fill="none"
            stroke="#2c2c2c"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </>
      );

    default:
      return (
        <>
          <circle cx="40" cy="80" r="4" fill="#2c2c2c" />
          <circle cx="80" cy="80" r="4" fill="#2c2c2c" />
        </>
      );
  }
}