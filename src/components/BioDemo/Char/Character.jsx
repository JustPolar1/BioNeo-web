import Pot from "./Pot";
import Sprout from "./Sprout";
import Expressions from "./Expressions";
import CharacterPart from "./CharacterPart";
import { defaultLayout } from "./Layout";

export default function Character({
  size = 300,
  scale = 1,
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
        <Expressions/>
      </CharacterPart>


    </div>
  );
}