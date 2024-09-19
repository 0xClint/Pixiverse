import { TILES } from "@/helpers/tiles";
import { Placement } from "./Placement";
import Sprite from "@/components/object-graphics/Sprite";

export class GoalPlacement extends Placement {
  renderComponent() {
    return <Sprite frameCoord={TILES.GOAL_DISABLED} size={32} />;
  }
}
