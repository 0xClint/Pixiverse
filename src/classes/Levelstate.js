import { PLACEMENT_TYPE_HERO } from "@/helpers/consts";
import { placementFactory } from "./PlacementFactory";
import { GameLoop } from "./GameLoop";
import { DirectionControls } from "./DirectionControls";
import Levels from "@/Levels/LevelsMap";
import { Inventory } from "./Inventory";
import { LevelAnimatedFrames } from "./LevelAnimatedFrames";
import { Camera } from "./Camera";

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
    this.deathOutcome = null;

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

    //Create fram animation manager
    this.animatedFrames = new LevelAnimatedFrames();

    //Cache a reference to the Hero
    this.heroRef = this.placements.find((p) => p.type == PLACEMENT_TYPE_HERO);

    //Create a Camera
    this.camera = new Camera(this);

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

    //Work on animation frames
    this.animatedFrames.tick();

    //Update the camera
    this.camera.tick();

    // Emit any changes in React
    this.onEmit(this.getState());
  }

  isPositionOutOfBounds(x, y) {
    return x == 0 || y == 0 || x > this.tilesWidth || y > this.tilesHeight;
  }

  switchAllDoors() {
    this.placements.forEach((placement) => {
      if (placement.toggleIsRaised) {
        placement.toggleIsRaised();
      }
    });
  }

  stealInventory() {
    this.placements.forEach((p) => {
      p.resetHasBeenCollected();
    });
    this.inventory.clear();
  }

  setDeathOutcome(causeOfDeath) {
    this.deathOutcome = causeOfDeath;
    this.gameLoop.stop();
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
      deathOutcome: this.deathOutcome,
      isCompleted: this.isCompleted,
      cameraTransformX: this.camera.transformX,
      cameraTransformY: this.camera.transformY,
    };
  }

  destroy() {
    //Tear down the level
    this.gameLoop.stop();
    this.directionControls.unbind();
  }
}
