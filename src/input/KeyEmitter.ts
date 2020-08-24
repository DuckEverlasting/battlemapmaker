import App from "../system/App";

export default class KeyEmitter {
  app: App;

  constructor(app: App) {
    this.app = app;
    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("keyup", this.handleKeyUp);
  }

  handleKeyDown(e: KeyboardEvent) {
    this.app.inputHandler.keyDown(e);
  }

  handleKeyUp(e: KeyboardEvent) {
    this.app.inputHandler.keyUp(e);
  }

  destroy() {
    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("keyup", this.handleKeyUp);
  }
}