import { MouseInput, Tool } from "../types";
import { App } from "../system/App";
import { TileMap } from "../graphics";

export abstract class BaseTool implements Tool {
  public isActive: boolean;
  public triggersOn: "cursorMove" | "tileChange" = "tileChange";
  protected app: App;
  protected writesToTileMap = false;
  protected clearsOnUpdate = false;
  protected tileMap: TileMap;
  protected layer: number | null;

  constructor(app: App) {
    this.app = app;
    this.layer = this.app.getState().activeLayer;
  }

  start(input: MouseInput) {
    this.layer = this.app.getState().activeLayer;
    if (this.writesToTileMap) {
      this.app.getTileMap().save();
    }
    this.onStart(input);
    this.isActive = true;
  };
  update(input: MouseInput) {
    if (this.writesToTileMap && this.clearsOnUpdate) {
      this.app.getTileMap().undo();
      this.app.getTileMap().save();
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
