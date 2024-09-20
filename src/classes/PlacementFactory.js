import { CelebrationPlacement } from "@/game-objects/CelebrationPlacement";
import { FlourPlacement } from "@/game-objects/FlourPlacement";
import { GoalPlacement } from "@/game-objects/GoalPlacement";
import { HeroPlacement } from "@/game-objects/HeroPlacement";
import { KeyPlacement } from "@/game-objects/KeyPlacement";
import { LockPlacement } from "@/game-objects/LockPlacement";
import { WallPlacement } from "@/game-objects/WallPlacement";
import {
  PLACEMENT_TYPE_HERO,
  PLACEMENT_TYPE_WALL,
  PLACEMENT_TYPE_FLOUR,
  PLACEMENT_TYPE_CELEBRATION,
  PLACEMENT_TYPE_GOAL,
  PLACEMENT_TYPE_KEY,
  PLACEMENT_TYPE_LOCK,
} from "@/helpers/consts";

const placementTypeClassMap = {
  [PLACEMENT_TYPE_HERO]: HeroPlacement,
  [PLACEMENT_TYPE_GOAL]: GoalPlacement,
  [PLACEMENT_TYPE_WALL]: WallPlacement,
  [PLACEMENT_TYPE_FLOUR]: FlourPlacement,
  [PLACEMENT_TYPE_CELEBRATION]: CelebrationPlacement,
  [PLACEMENT_TYPE_LOCK]: LockPlacement,
  [PLACEMENT_TYPE_KEY]: KeyPlacement,
  // [PLACEMENT_TYPE_WATER]: WaterPlacement,
  // [PLACEMENT_TYPE_WATER_PICKUP]: WaterPickupPlacement,
  // [PLACEMENT_TYPE_GROUND_ENEMY]: GroundEnemyPlacement,
  // [PLACEMENT_TYPE_FLYING_ENEMY]: FlyingEnemyPlacement,
  // [PLACEMENT_TYPE_ROAMING_ENEMY]: RoamingEnemyPlacement,
  // [PLACEMENT_TYPE_CONVEYOR]: ConveyorPlacement,
  // [PLACEMENT_TYPE_ICE]: IcePlacement,
  // [PLACEMENT_TYPE_ICE_PICKUP]: IcePickupPlacement,
  // [PLACEMENT_TYPE_FIRE]: FirePlacement,
  // [PLACEMENT_TYPE_FIRE_PICKUP]: FirePickupPlacement,
  // [PLACEMENT_TYPE_SWITCH_DOOR]: SwitchableDoorPlacement,
  // [PLACEMENT_TYPE_SWITCH]: DoorSwitchPlacement,
  // [PLACEMENT_TYPE_TELEPORT]: TeleportPlacement,
  // [PLACEMENT_TYPE_THIEF]: ThiefPlacement,
  // [PLACEMENT_TYPE_CIABATTA]: CiabattaPlacement,
};

class PlacementFactory {
  createPlacement(config, level) {
    const placementsClass = placementTypeClassMap[config.type];
    if (!placementsClass) {
      console.warn("NO TYPE FOUND", config.type);
    }
    //Generate new instance
    const instance = new placementsClass(config, level);
    instance.id = Math.floor(Math.random() * 9999999) + 1;
    return instance;
  }
}

export const placementFactory = new PlacementFactory();
