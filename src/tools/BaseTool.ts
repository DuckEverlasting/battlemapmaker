import { MouseInput, Tool } from "../types";
import { App } from "../system/App";

export abstract class BaseTool implements Tool {
  app: App;
  isActive: boolean;

  constructor(app: App) {
    this.app = app;
  }

  start(input: MouseInput) {
    this.onStart(input);
  };
  update(input: MouseInput) {
    this.onUpdate(input);
  };
  end(input: MouseInput) {
    this.onEnd(input);
  };

  onStart(input: MouseInput) {};
  onUpdate(input: MouseInput) {};
  onEnd(input: MouseInput) {};
}