import Pot from "./Pot";
import Sprout from "./Sprout";
import Face from "./Face/Face";
import CharacterPart from "./CharacterPart";
import { defaultLayout } from "./Layout";

import { useState, useEffect } from "react";

import { AnimatePresence } from "framer-motion";
import { idleSprout, idleTransition } from "../Motion/idle";

export default function Character({
  size = 300,
  scale = 1,
  variant = "neutral"
}) {

  const [emotion, setEmotion] = useState("neutral");

useEffect(() => {
  const emotions = ["neutral", "happy", "sad", "sleepy"];
  let index = 0;

  const interval = setInterval(() => {
    index = (index + 1) % emotions.length;
    setEmotion(emotions[index]);
  }, 2000);

  return () => clearInterval(interval);
}, []);

  return (
    <div
      className="relative"
      style={{
        width:size,
        height:size,
        transform:`scale(${scale})`
      }}
    >

      <CharacterPart
        layout={defaultLayout.sprout}
        animate={idleSprout}
        transition={idleTransition}
      >
        <Sprout />
      </CharacterPart>

      <CharacterPart layout={defaultLayout.pot}>
        <Pot/>
      </CharacterPart>

      <CharacterPart layout={defaultLayout.face}>
        <AnimatePresence mode="wait">
          <Face
            key={emotion}
            emotion={emotion}
          />
        </AnimatePresence>
      </CharacterPart>


    </div>
  );
}