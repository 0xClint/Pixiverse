import { PLACEMENT_TYPE_HERO } from "@/helpers/consts";
import { placementFactory } from "./PlacementFactory";
import { GameLoop } from "./GameLoop";
import { DirectionControls } from "./DirectionControls";
import Levels from "@/Levels/LevelsMap";
import { Inventory } from "./Inventory";

export class LevelState {
  constructor(levelId, onEmit) {
    this.id = levelId;
    this.onEmit = onEmit;
    this.directionControls = new DirectionControls();

    //Start the level
    this.start();
  }

  start() {
    this.isCompleted = false;

    const levelData = Levels[this.id];
    console.log(levelData);
    this.theme = levelData.theme;
    this.tilesWidth = levelData.tilesWidth;
    this.tilesHeight = levelData.tilesHeight;
    this.placements = levelData.placements.map((config) => {
      return placementFactory.createPlacement(config, this);
    });

    //Fresh Inventory
    this.inventory = new Inventory();

    //Cache a reference to the Hero
    this.heroRef = this.placements.find((p) => p.type == PLACEMENT_TYPE_HERO);
    this.startGameLoop();
  }

  startGameLoop() {
    this.gameLoop?.stop();
    this.gameLoop = new GameLoop(() => {
      this.tick();
    });
  }

  addPlacement(config) {
    this.placements.push(placementFactory.createPlacement(config, this));
  }

  deletePlacement(placementToRemove) {
    this.placements = this.placements.filter((p) => {
      return p.id !== placementToRemove.id;
    });
  }

  tick() {
    //Check for movement here
    if (this.directionControls.direction) {
      this.heroRef.controllerMoveRequested(this.directionControls.direction);
    }

    //Call tick on any placement that wants to update
    this.placements.forEach((placement) => {
      placement.tick();
    });

    // Emit any changes in React
    this.onEmit(this.getState());
  }

  isPositionOutOfBounds(x, y) {
    return x == 0 || y == 0 || x > this.tilesWidth || y > this.tilesHeight;
  }

  completeLevel() {
    this.isCompleted = true;
    this.gameLoop.stop();
  }

  getState() {
    return {
      theme: this.theme,
      tilesWidth: this.tilesWidth,
      tilesHeight: this.tilesHeight,
      placements: this.placements,
      isCompleted: this.isCompleted,
    };
  }

  destroy() {
    //Tear down the level
    this.gameLoop.stop();
    this.directionControls.unbind();
  }
}
