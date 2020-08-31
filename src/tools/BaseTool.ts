import { MouseInput, Tool } from "../types";
import { App } from "../system/App";
import { TileMap } from "../graphics";

export abstract class BaseTool implements Tool {
  app: App;
  isActive: boolean;
  tileMap: TileMap;

  constructor(app: App) {
    this.app = app;
    this.tileMap = app.getTileMap();
  }

  start(input: MouseInput) {
    this.onStart(input);
    this.isActive = true;
  };
  update(input: MouseInput) {
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
