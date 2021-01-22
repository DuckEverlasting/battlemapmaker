import { ImageSource } from "../graphics";
import { loadImage } from "../util/helpers";
import arrow from "../media/cursors/arrow-basic.png";
import zoomIn from "../media/cursors/zoom-plus.png";
import zoomOut from "../media/cursors/zoom-minus.png";

export const LAYER = {
  "BG": 0,
  "TERRAIN_1": 1,
  "TERRAIN_2": 2,
  "OBJECT_1": 3,
  "OBJECT_2": 4,
  "SELECTION": 6,
  "EFFECT_TILEMAP": 5,
  "EFFECT_ALL": 7,
  "CURSOR": 8
}

export const LAYER_COUNT = Object.keys(LAYER).length;

export const SPRITE_TYPE = {
  "TERRAIN": 0,
  "OBJECT": 1,
  "EFFECT": 2,
  "CURSOR": 3,
  "OTHER": 4
}

export const LAYER_TYPE: {[key: number]: number, [key: string]: number} = {
  0: 4,
  1: 0,
  2: 0,
  3: 1,
  4: 1,
  5: 2,
  6: 2,
  7: 3
}

export const ADJACENCY = {
  "UP": 0,
  "RIGHT": 1,
  "DOWN": 2,
  "LEFT": 3
}

export const getCursors = async () => ({
  arrow: (new ImageSource(await loadImage(arrow))),
  zoomIn: (new ImageSource(await loadImage(zoomIn))),
  zoomOut: (new ImageSource(await loadImage(zoomOut)))
});

export const TOOL_ICON = {
  freehand: ,
  shape: ,
  fill: ,
  erase: ,
  move: ,
  zoom: 
}