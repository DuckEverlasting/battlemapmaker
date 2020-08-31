import { App } from "../../system/App";
import { BaseTool } from "../BaseTool";
import { MouseInput, PanZoomTool } from "../../types";

export class MoveTool extends BaseTool implements PanZoomTool {
  constructor(app: App) {
    super(app);
  }

  onStart(input: MouseInput) {

  }

  onUpdate(input: MouseInput) {

  }

  onEnd(input: MouseInput) {

  }

  wheel(input: MouseInput) {
    
  }
}