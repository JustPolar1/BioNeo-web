const emotionStyles = {
  neutral: {
    radius: 5,
    opacity: 0.6,
    color: "#ff9999",
    visible: true,
  },

  happy: {
    radius: 6,
    opacity: 0.7,
    color: "#ff9999",
    visible: true,
  },

  sad: {
    radius: 4,
    opacity: 0.3,
    color: "#ff9999",
    visible: true,
  },

  sleepy: {
    radius: 5,
    opacity: 0.3,
    color: "#ff9999",
    visible: true,
  },
};

export default function Blush({ variant = "neutral" }) {
  const blush = emotionStyles[variant] ?? emotionStyles.neutral;

  if (!blush.visible) return null;

  return (
    <>
      <circle
        cx="25"
        cy="95"
        r={blush.radius}
        fill={blush.color}
        opacity={blush.opacity}
      />

      <circle
        cx="95"
        cy="95"
        r={blush.radius}
        fill={blush.color}
        opacity={blush.opacity}
      />
    </>
  );
}