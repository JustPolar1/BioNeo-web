import Pot from "./Pot";
import Sprout from "./Sprout";
import Face from "./Face/Face";
import CharacterPart from "./CharacterPart";
import { defaultLayout } from "./Layout";

export default function Character({
  size = 300,
  scale = 1,
  emotion = "neutral"
}) {
  return (
    <div
      className="relative"
      style={{
        width:size,
        height:size,
        transform:`scale(${scale})`
      }}
    >

      <CharacterPart layout={defaultLayout.sprout}>
        <Sprout/>
      </CharacterPart>

      <CharacterPart layout={defaultLayout.pot}>
        <Pot/>
      </CharacterPart>

      <CharacterPart layout={defaultLayout.face}>
        <Face
          emotion="embarrassed"
        />
      </CharacterPart>


    </div>
  );
}