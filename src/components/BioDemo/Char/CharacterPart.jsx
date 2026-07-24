import { motion } from "framer-motion";

export default function CharacterPart({
  children,
  layout,
  animate,
  transition,
}) {
  return (
    <motion.div
      className="absolute"
      style={{
        left: `${layout.x}%`,
        top: `${layout.y}%`,
        width: `${layout.width}%`,
        height: `${layout.height}%`,
      }}
      animate={animate}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}