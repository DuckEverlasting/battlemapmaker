import { App } from "../../system/App";
import { BaseTool } from "../BaseTool";
import { MouseInput, PanZoomTool } from "../../types";
import { attachButtons } from "../../util/helpers";

export class MoveTool extends BaseTool implements PanZoomTool {
  onStart(input: MouseInput) {

  }

  onUpdate(input: MouseInput) {

  }

  onEnd(input: MouseInput) {

  }

  wheel(input: MouseInput, direction: number) {
    const strength = input.modifiers.shift ? 2 : 1,
      rect = this.app.getState().rect;
    if (input.modifiers.mod) {
      rect.offsetX += 10 * direction * strength;
    } else {
      rect.offsetY += 10 * direction * strength;
    }
    this.app.getDisplay().mainMarkedForRender = true;
  }
}