import { BaseTool } from "../BaseTool";
import { MouseInput, PanZoomTool } from "../../types";
import { Vector, vect } from "../../util/Vector";
import { App } from "../../system";

export class MoveTool extends BaseTool implements PanZoomTool {
  private origin: Vector;
  private originOffsetX: number;
  private originOffsetY: number;
  public triggersOn: "tileChange" | "cursorMove" = "cursorMove";

  constructor(app: App) {
    super(app);
    this.name = "move";
  }

  onStart(input: MouseInput) {
    this.origin = input.position;
    this.originOffsetX = this.app.getState().rect.offsetX;
    this.originOffsetY = this.app.getState().rect.offsetY;
  }

  onUpdate(input: MouseInput) {
    const diff = vect(input.position.x - this.origin.x, input.position.y - this.origin.y),
      rect = this.app.getState().rect;
    rect.offsetX = this.originOffsetX + diff.x;
    rect.offsetY = this.originOffsetY + diff.y;
    this.app.getDisplay().mainMarkedForRender = true;
  }

  onEnd(input: MouseInput) {
    this.origin = null;
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