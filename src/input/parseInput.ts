import { modKey } from "../util/helpers";
import { MouseInput, KeyInput, TranslateData } from "../types";
import { Vector, vect } from "../util/Vector";

export function parseMouseInput(e: MouseEvent, t: TranslateData) {
  let buttons: boolean[];
  switch (e.buttons % 8) {
    case 0:
      buttons = [false, false, false];
      break;
    case 1:
      buttons = [true, false, false];
      break;
    case 2:
      buttons = [false, true, false];
      break;
    case 3:
      buttons = [true, true, false];
      break;
    case 4:
      buttons = [false, false, true];
      break;
    case 5:
      buttons = [true, false, true];
      break;
    case 6:
      buttons = [false, true, true];
      break;
    case 7:
      buttons = [true, true, true];
      break;
  }

  const isInside = (
    e.offsetX >= t.rect.offsetX
    && e.offsetX < t.rect.offsetX + t.rect.width
    && e.offsetY >= t.rect.offsetY
    && e.offsetY < t.rect.offsetY + t.rect.height
  ),
    x = Math.floor((e.offsetX - t.rect.offsetX) / t.tileWidth),
    y = Math.floor((e.offsetY - t.rect.offsetY) / t.tileHeight),
    position = vect(Math.floor(e.offsetX), Math.floor(e.offsetY)),
    tile = isInside ? vect(x, y) : vect(-1, -1),
    result: MouseInput = { position, tile, buttons };
  return result;
}

export function parseKeyInput(e: KeyboardEvent): KeyInput | null {
  if (["Alt", "Shift", "Control", "Meta"].includes(e.key)) {
    return null;
  }
  let result: KeyInput = "";
  if (modKey(e)) result += "mod-";
  if (e.shiftKey) result += "shift-";
  if (e.altKey) result += "alt-";
  result += e.key;
  return result;
}