import { App } from "../system/App";
import { Callable } from "../types";

export abstract class CalledAction implements Callable {
  app: App;

  constructor(app: App) {
    this.app = app;
  }

  run(params?: object) {}
}
