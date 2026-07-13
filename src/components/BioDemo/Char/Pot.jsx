import React from "react";
import Expressions from "./Expressions";
import PotSVG from "../../../assets/pot.svg?react";

export default function Pot({
  emotion = "neutral",
  size = 300,
}) {
  return (
    <div
      className="relative inline-block"
      style={{ width: size, height: size }}
    >
      <PotSVG
        className="absolute inset-0 w-full h-full"
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <Expressions emotion={emotion} />
      </div>
    </div>
  );
}