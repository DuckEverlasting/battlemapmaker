import { MouseInput, Tool } from "../types";
import { App } from "../system/App";
import { TileMap, StagingTileMap } from "../graphics";

export abstract class BaseTool implements Tool {
  app: App;
  isActive: boolean;
  tileMap: TileMap;
  staging: StagingTileMap;

  constructor(app: App) {
    this.app = app;
    this.tileMap = app.getTileMap();
    this.staging = app.getStagingMap();
  }

  start(input: MouseInput) {
    this.onStart(input);
    this.isActive = true;
  };
  update(input: MouseInput) {
    console.log("Hey")
    this.onUpdate(input);
  };
  end(input: MouseInput) {
    this.onEnd(input);
    this.isActive = false;
  };

  onStart(input: MouseInput) {}
  onUpdate(input: MouseInput) {}
  onEnd(input: MouseInput) {}
}
