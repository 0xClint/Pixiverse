import { CelebrationPlacement } from "@/game-objects/CelebrationPlacement";
import { ConveyorPlacement } from "@/game-objects/ConveyorPlacement";
import { DoorSwitchPlacement } from "@/game-objects/DoorSwitchPlacement";
import { FirePickupPlacement } from "@/game-objects/FirePickupPlacement";
import { FirePlacement } from "@/game-objects/FirePlacement";
import { FlourPlacement } from "@/game-objects/FlourPlacement";
import { FlyingEnemyPlacement } from "@/game-objects/FlyingEnemyPlacement";
import { GoalPlacement } from "@/game-objects/GoalPlacement";
import { GroundEnemyPlacement } from "@/game-objects/GroundEnemyPlacement";
import { HeroPlacement } from "@/game-objects/HeroPlacement";
import { IcePickupPlacement } from "@/game-objects/IcePickupPlacement";
import { IcePlacement } from "@/game-objects/IcePlacement";
import { KeyPlacement } from "@/game-objects/KeyPlacement";
import { LockPlacement } from "@/game-objects/LockPlacement";
import { RoamingEnemyPlacement } from "@/game-objects/RoamingEnemyPlacement";
import { SwitchableDoorPlacement } from "@/game-objects/SwitchableDoorPlacement";
import { TeleportPlacement } from "@/game-objects/TeleportPlacement";
import { ThiefPlacement } from "@/game-objects/ThiefPlacement";
import { WallPlacement } from "@/game-objects/WallPlacement";
import { WaterPickupPlacement } from "@/game-objects/WaterPickupPlacement";
import { WaterPlacement } from "@/game-objects/WaterPlacement";
import {
  PLACEMENT_TYPE_HERO,
  PLACEMENT_TYPE_WALL,
  PLACEMENT_TYPE_FLOUR,
  PLACEMENT_TYPE_CELEBRATION,
  PLACEMENT_TYPE_GOAL,
  PLACEMENT_TYPE_KEY,
  PLACEMENT_TYPE_LOCK,
  PLACEMENT_TYPE_WATER,
  PLACEMENT_TYPE_WATER_PICKUP,
  PLACEMENT_TYPE_GROUND_ENEMY,
  PLACEMENT_TYPE_FLYING_ENEMY,
  PLACEMENT_TYPE_ROAMING_ENEMY,
  PLACEMENT_TYPE_CONVEYOR,
  PLACEMENT_TYPE_ICE_PICKUP,
  PLACEMENT_TYPE_ICE,
  PLACEMENT_TYPE_FIRE,
  PLACEMENT_TYPE_FIRE_PICKUP,
  PLACEMENT_TYPE_SWITCH,
  PLACEMENT_TYPE_SWITCH_DOOR,
  PLACEMENT_TYPE_TELEPORT,
  PLACEMENT_TYPE_THIEF,
} from "@/helpers/consts";

const placementTypeClassMap = {
  [PLACEMENT_TYPE_HERO]: HeroPlacement,
  [PLACEMENT_TYPE_GOAL]: GoalPlacement,
  [PLACEMENT_TYPE_WALL]: WallPlacement,
  [PLACEMENT_TYPE_FLOUR]: FlourPlacement,
  [PLACEMENT_TYPE_CELEBRATION]: CelebrationPlacement,
  [PLACEMENT_TYPE_LOCK]: LockPlacement,
  [PLACEMENT_TYPE_KEY]: KeyPlacement,
  [PLACEMENT_TYPE_WATER]: WaterPlacement,
  [PLACEMENT_TYPE_WATER_PICKUP]: WaterPickupPlacement,
  [PLACEMENT_TYPE_GROUND_ENEMY]: GroundEnemyPlacement,
  [PLACEMENT_TYPE_FLYING_ENEMY]: FlyingEnemyPlacement,
  [PLACEMENT_TYPE_ROAMING_ENEMY]: RoamingEnemyPlacement,
  [PLACEMENT_TYPE_CONVEYOR]: ConveyorPlacement,
  [PLACEMENT_TYPE_ICE]: IcePlacement,
  [PLACEMENT_TYPE_ICE_PICKUP]: IcePickupPlacement,
  [PLACEMENT_TYPE_FIRE]: FirePlacement,
  [PLACEMENT_TYPE_FIRE_PICKUP]: FirePickupPlacement,
  [PLACEMENT_TYPE_SWITCH_DOOR]: SwitchableDoorPlacement,
  [PLACEMENT_TYPE_SWITCH]: DoorSwitchPlacement,
  [PLACEMENT_TYPE_TELEPORT]: TeleportPlacement,
  [PLACEMENT_TYPE_THIEF]: ThiefPlacement,
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
