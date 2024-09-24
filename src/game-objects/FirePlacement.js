import { TILES } from "@/helpers/tiles";
import { Placement } from "./Placement";
import Sprite from "@/components/object-graphics/Sprite";
import {
  BODY_SKINS,
  PLACEMENT_TYPE_FIRE_PICKUP,
  PLACEMENT_TYPE_HERO,
} from "@/helpers/consts";

export class FirePlacement extends Placement {
  changesHeroSkinOnCollide() {
    return BODY_SKINS.FIRE;
  }

  damagesBodyOnCollide(body) {
    const { inventory } = this.level;
    return (
      body.type === PLACEMENT_TYPE_HERO &&
      !inventory.has(PLACEMENT_TYPE_FIRE_PICKUP)
    );
  }
  renderComponent() {
    const fireFrame = this.level.animatedFrames.fireFrame;
    return <Sprite frameCoord={fireFrame} />;
  }
}
