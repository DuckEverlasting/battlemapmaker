import { RectArgs } from "../types";

function isRectArray(args: RectArgs): args is Rect[] {
  return (<Rect[]>args)[0].offsetX !== undefined;
}

/**
 * Utility class for storing size and position values. Note: auto-converts to integers.
 * Constructor accepts numbers or another Rect. 
 */
export class Rect {
  public offsetX: number;
  public offsetY: number;
  public width: number;
  public height: number;

  constructor(...args: RectArgs) {
    if (isRectArray(args)) {
      const rect = args[0];
      this.offsetX = rect.offsetX;
      this.offsetY = rect.offsetY;
      this.width = rect.width;
      this.height = rect.height;
    } else {
      this.offsetX = Math.floor(args[0]);
      this.offsetY = Math.floor(args[1]);
      this.width = Math.floor(args[2]);
      this.height = Math.floor(args[3]);
    }
  }
}