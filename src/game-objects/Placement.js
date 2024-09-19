import {
  CELL_SIZE,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  DIRECTION_UP,
} from "@/helpers/consts";

export class Placement {
  constructor(properties, level) {
    this.id = properties.id;
    this.type = properties.type;
    this.x = properties.x;
    this.y = properties.y;
    this.level = level;

    this.travelPixelsPerFrame = 1.5;
    this.movingPixelsRemaining = 0;
    this.movingPixelDirection = DIRECTION_RIGHT;
    this.spritFacingDirection = DIRECTION_RIGHT;
    this.spriteWalkFrame = 0;
  }

  tick() {}

  displayXY() {
    if (this.movingPixelsRemaining > 0) {
      return this.displayMovingXY();
    }
    const x = this.x * CELL_SIZE;
    const y = this.y * CELL_SIZE;
    return [x, y];
  }

  displayMovingXY() {
    const x = this.x * CELL_SIZE;
    const y = this.y * CELL_SIZE;
    const progressPixels = CELL_SIZE - this.movingPixelsRemaining;
    // console.log(progressPixels);
    switch (this.movingPixelDirection) {
      case DIRECTION_LEFT:
        return [x - progressPixels, y];
      case DIRECTION_RIGHT:
        return [x + progressPixels, y];
      case DIRECTION_UP:
        return [x, y - progressPixels];
      default:
        return [x, y + progressPixels];
    }
  }

  renderComponent() {
    return null;
  }
}