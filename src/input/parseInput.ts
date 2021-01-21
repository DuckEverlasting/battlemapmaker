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
      buttons = [false, false, true];
      break;
    case 3:
      buttons = [true, false, true];
      break;
    case 4:
      buttons = [false, true, false];
      break;
    case 5:
      buttons = [true, true, false];
      break;
    case 6:
      buttons = [false, true, true];
      break;
    case 7:
      buttons = [true, true, true];
      break;
  }

  const isInside = (
    e.offsetX >= t.rect.offsetX + t.marginLeft
    && e.offsetX < t.rect.offsetX + t.marginLeft + t.rect.width * t.zoom
    && e.offsetY >= t.rect.offsetY + t.marginTop
    && e.offsetY < t.rect.offsetY + t.marginTop + t.rect.height * t.zoom
  ),
  x = Math.floor((e.offsetX - t.rect.offsetX - t.marginLeft) / (t.tileWidth * t.zoom)),
  y = Math.floor((e.offsetY - t.rect.offsetY - t.marginTop) / (t.tileHeight * t.zoom)),
  position = vect(Math.floor(e.offsetX), Math.floor(e.offsetY)),
  tile = isInside ? vect(x, y) : null,
  modifiers = {
    shift: e.shiftKey,
    alt: e.altKey,
    mod: modKey(e)
  },
  screen = vect(e.screenX, e.screenY),
  result: MouseInput = { position, tile, buttons, modifiers, screen };
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
  result += e.key.toLowerCase();
  return result;
}