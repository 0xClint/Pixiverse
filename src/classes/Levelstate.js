import { LEVEL_THEMES } from "@/helpers/consts";
import { TILES } from "@/helpers/tiles";

export class LevelState {
  constructor(levelId, onEmit) {
    this.id = levelId;
    this.onEmit = onEmit;

    //Start the level
    this.start();
  }

  start() {
    this.theme = LEVEL_THEMES.BLUE;
    this.tilesWidth = 9;
    this.tilesHeight = 9;
    this.placements = [
      {
        id: 0,
        x: 0,
        y: 0,
        frameCoord: TILES.ICE_PICKUP,
      },
      {
        id: 1,
        x: 1,
        y: 1,
        frameCoord: TILES.BULLET_DROPBOX,
      },
      {
        id: 2,
        x: 2,
        y: 2,
        frameCoord: TILES.CLOCK,
      },
      {
        id: 3,
        x: 3,
        y: 3,
        frameCoord: TILES.FIRE_PICKUP,
      },
    ];

    setTimeout(() => {
      this.placements = [
        ...this.placements,
        {
          id: 6,
          x: 4,
          y: 2,
          frameCoord: TILES.FIRE_PICKUP,
        },
      ];
      this.onEmit(this.getState());
    }, 1000);
  }

  getState() {
    return {
      theme: this.theme,
      tilesWidth: this.tilesWidth,
      tilesHeight: this.tilesHeight,
      placements: this.placements,
      //   deathOutcome: this.deathOutcome,
      //   isCompleted: this.isCompleted,
      //   cameraTransformX: this.camera.transformX,
      //   cameraTransformY: this.camera.transformY,
      //   secondsRemaining: this.clock.secondsRemaining,
      //   inventory: this.inventory,
      //   restart: () => {
      //     this.start();
      //   },
    };
  }

  destroy() {
    //Tear down the level
  }
}
