import { facePresets } from "./facePresets";

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

        <svg
            viewBox="0 0 120 140"
            className="w-full h-full"
        >
            <Blush variant={config.blush} />
            <Eyes variant={config.eyes} />
            <Mouth variant={config.mouth} />
        </svg>

    );

}