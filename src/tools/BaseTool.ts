import { MouseInput, Tool } from "../types";
import { App } from "../system/App";
import { TileMap } from "../graphics";

export abstract class BaseTool implements Tool {
  app: App;
  isActive: boolean;
  protected writesToTileMap = false;
  protected clearsOnUpdate = false;
  protected tileMap: TileMap;
  protected layer: number | null;

  constructor(app: App) {
    this.app = app;
    this.tileMap = app.getTileMap();
    this.layer = this.app.getState().activeLayer;
  }

  start(input: MouseInput) {
    this.layer = this.app.getState().activeLayer;
    if (this.writesToTileMap) {
      this.tileMap.save();
    }
    this.onStart(input);
    this.isActive = true;
  };
  update(input: MouseInput) {
    if (this.writesToTileMap && this.clearsOnUpdate) {
      this.tileMap.undo();
      this.tileMap.save();
    }
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
