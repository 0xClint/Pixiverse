import {
  BODY_SKINS,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  directionUpdateMap,
  HERO_RUN_1,
  HERO_RUN_2,
  Z_INDEX_LAYER_SIZE,
} from "@/helpers/consts";
import { Placement } from "./Placement";
import Hero from "@/components/object-graphics/Hero";
import { TILES } from "@/helpers/tiles";
import { Collision } from "@/classes/Collision";

const heroSkinMap = {
  [BODY_SKINS.NORMAL]: [TILES.HERO_LEFT, TILES.HERO_RIGHT],
  // [BODY_SKINS.WATER]: [TILES.HERO_WATER_LEFT, TILES.HERO_WATER_RIGHT],
  // [BODY_SKINS.FIRE]: [TILES.HERO_FIRE_LEFT, TILES.HERO_FIRE_RIGHT],
  // [BODY_SKINS.DEATH]: [TILES.HERO_DEATH_LEFT, TILES.HERO_DEATH_RIGHT],
  // [BODY_SKINS.SCARED]: [TILES.HERO_DEATH_LEFT, TILES.HERO_DEATH_RIGHT],
  // [BODY_SKINS.ICE]: [TILES.HERO_ICE_LEFT, TILES.HERO_ICE_RIGHT],
  // [BODY_SKINS.CONVEYOR]: [TILES.HERO_CONVEYOR_LEFT, TILES.HERO_CONVEYOR_RIGHT],
  // [BODY_SKINS.TELEPORT]: [TILES.HERO_TELEPORT_LEFT, TILES.HERO_TELEPORT_RIGHT],
  [HERO_RUN_1]: [TILES.HERO_RUN_1_LEFT, TILES.HERO_RUN_1_RIGHT],
  [HERO_RUN_2]: [TILES.HERO_RUN_2_LEFT, TILES.HERO_RUN_2_RIGHT],
};

export class HeroPlacement extends Placement {
  controllerMoveRequested(direction) {
    //Attempt to start moving
    if (this.movingPixelsRemaining > 0) {
      return;
    }

    //Make sure the next space is available
    const canMove = this.canMoveToNextDestination(direction);
    if (!canMove) {
      return;
    }

    //Start the move
    this.movingPixelsRemaining = 16;
    this.movingPixelDirection = direction;
    this.updateFacingDirection();
    this.updateWalkFrame();
  }

  canMoveToNextDestination(direction) {
    //next space bound?
    const { x, y } = directionUpdateMap[direction];

    const nextX = this.x + x;
    const nextY = this.y + y;
    const isOutOfBounds = this.level.isPositionOutOfBounds(nextX, nextY);
    if (isOutOfBounds) return false;

    //Is there a solid thing?
    const collision = new Collision(this, this.level, { x: nextX, y: nextY });

    if (collision.withSolidPlacement()) {
      return false;
    }

    return true;
  }

  updateFacingDirection() {
    if (
      this.movingPixelDirection === DIRECTION_LEFT ||
      this.movingPixelDirection === DIRECTION_RIGHT
    ) {
      this.spritFacingDirection = this.movingPixelDirection;
    }
  }

  updateWalkFrame() {
    this.spriteWalkFrame = this.spriteWalkFrame === 1 ? 0 : 1;
  }

  tick() {
    this.tickMovingPixelProgress();
  }

  tickMovingPixelProgress() {
    if (this.movingPixelsRemaining === 0) return;

    // console.log(this.movingPixelsRemaining);

    this.movingPixelsRemaining -= this.travelPixelsPerFrame;
    if (this.movingPixelsRemaining <= 0) {
      this.movingPixelsRemaining = 0;
      this.onDoneMoving();
    }
  }

  onDoneMoving() {
    //Update x,y
    const { x, y } = directionUpdateMap[this.movingPixelDirection];
    this.x += x;
    this.y += y;
    this.handleCollision();
  }

  handleCollision() {
    const collision = new Collision(this, this.level);
    const collideThatAddsToInventory = collision.withPlacementAddsToInventory();
    if (collideThatAddsToInventory) {
      console.log("Handle Collision!", collideThatAddsToInventory);
    }
  }
  getFrame() {
    //left/right frame to show
    const index = this.spritFacingDirection === DIRECTION_LEFT ? 0 : 1;

    //Correct walking frame per direction
    if (this.movingPixelsRemaining > 0) {
      const walkKey = this.spriteWalkFrame === 0 ? HERO_RUN_1 : HERO_RUN_2;
      return heroSkinMap[walkKey][index];
    }
    return heroSkinMap[BODY_SKINS.NORMAL][index];
  }

  getYTranslate() {
    //Stand on ground
    if (this.movingPixelsRemaining === 0) {
      return 0;
    }

    //Hoping while run code
    //Elevate ramp up or down at beginning/end of movement
    const PIXELS_FROM_END = 2;
    if (
      this.movingPixelsRemaining < PIXELS_FROM_END ||
      this.movingPixelsRemaining > 16 - PIXELS_FROM_END
    ) {
      return -1;
    }
    return -2;
  }

  zIndex() {
    return this.y * Z_INDEX_LAYER_SIZE + 1;
  }
  renderComponent() {
    return (
      <Hero frameCoord={this.getFrame()} yTranslate={this.getYTranslate()} />
    );
  }
}
