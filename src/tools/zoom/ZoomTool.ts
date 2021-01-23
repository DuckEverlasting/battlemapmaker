import { App } from "../../system/App";
import { BaseTool } from "../BaseTool";
import { MouseInput, PanZoomTool } from "../../types";

export class ZoomTool extends BaseTool implements PanZoomTool {
  constructor(app: App) {
    super(app);
    this.name = "zoom";
  }

  onStart(input: MouseInput) {
    this.setZoom(input.modifiers.shift ? -1 : 1);
  }

  wheel(_input: MouseInput, direction: 1 | -1) {
    this.setZoom(direction);
  }

  setZoom(direction: 1 | -1) {
    this.app.getState().zoom *= direction > 0 ? 2 : .5;
    this.app.getState().zoom = Math.max(0.0625, Math.min(this.app.getState().zoom, 32));
    this.app.getDisplay().mainMarkedForRender = true;
  }
}
