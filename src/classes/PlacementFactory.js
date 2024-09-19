const { GoalPlacement } = require("@/game-objects/GoalPlacement");
const { HeroPlacement } = require("@/game-objects/HeroPlacement");
const {
  PLACEMENT_TYPE_HERO,
  PLACEMENT_TYPE_GOAL,
} = require("@/helpers/consts");

class PlacementFactory {
  createPlacement(config, level) {
    const instance = this.getInstance(config, level);
    return instance;
  }

  getInstance(config, level) {
    switch (config.type) {
      case PLACEMENT_TYPE_HERO:
        return new HeroPlacement(config, level);
      case PLACEMENT_TYPE_GOAL:
        return new GoalPlacement(config, level);
      default:
        console.warn("NO TYPE FOUND", config.type);
        return null;
    }
  }
}

export const placementFactory = new PlacementFactory();
