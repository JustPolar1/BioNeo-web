import { facePresets } from "./facePresets";
import { AnimatePresence, motion } from "framer-motion";

import Eyes from "./Eyes";
import Mouth from "./Mouth";
import Blush from "./Blush";

export default function Face({
    emotion = "neutral"
}) {

    const config =
        facePresets[emotion] ??
        facePresets.neutral;

    return (

        // TODO:
        // Actualmente Face utiliza un crossfade completo.
        // En una versión futura se pueden animar Eyes, Mouth y Blush
        // de forma independiente para lograr transiciones más naturales.
        <motion.svg
        key={emotion}
        viewBox="0 0 120 140"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        initial={{
            opacity: 0,
        }}
        animate={{
            opacity: 1,
        }}
        exit={{
            opacity: 0,
        }}
        transition={{
            duration: 0.25,
        }}
        >
        <Blush variant={config.blush} />
        <Eyes variant={config.eyes} />
        <Mouth variant={config.mouth} />

        </motion.svg>
    );

}