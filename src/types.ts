import { Display } from './system';
import { Vector } from './util/Vector';
import { Rect } from './util/Rect';
import { ImageSource, TileMap } from './graphics';

export type AppType = {};

export type RectArgs = Rect[] | number[];

export type DisplayCanvas = HTMLCanvasElement | OffscreenCanvas;

export type MouseInput = {
  position: Vector;
  tile: Vector;
  buttons: boolean[];
  modifiers: {[key: string]: boolean};
  screen: Vector;
};

export type KeyInput = string;

export type TranslateData = {
  rect: Rect;
  zoom: number;
  tileWidth: number;
  tileHeight: number;
};

export type Keyboard = {
  [key: string]: Function;
};

export type Tool = {
  isActive: boolean;
  triggersOn: "cursorMove" | "tileChange";
  start(input: MouseInput): void;
  update(input: MouseInput): void;
  end(input: MouseInput): void;
};

export type PanZoomTool = Tool & {
  wheel(input: MouseInput, direction: number): void;
};

export type Toolbox = {
  [key: string]: Tool;
  move: PanZoomTool;
  zoom: PanZoomTool;
};

export type Callable = {
  run(params?: object): void;
};

export interface Renderable {
  id: string;
  render(display?: Display, props?: RenderProps): void;
};

export interface ISprite extends Renderable {
  imageSource: ImageSource
  type: number
  rect: Rect
  widthInTiles: number
  heightInTiles: number
  maxOffsetX: number
  maxOffsetY: number
  getSource(): CanvasSource;
  renderSprite(display: Display, rect: Rect, tile: Vector, layer: number, gridOffset?: Vector): void;
}

export type QueueableFlag = "updateOnTileChange"|"updateOnCursorMove";

export type CanvasSource = HTMLImageElement | HTMLCanvasElement | ImageBitmap | OffscreenCanvas;

export type RenderProps = any;

export type SpriteParams = {
  rect?: Rect;
  type?: string;
  initPosition?: Vector;
  updateOnCursorMove?: boolean;
  updateOnTileChange?: boolean;
}

export type SpriteRenderProps = {tile: Vector, layer: number, gridOffset?: Vector, tileMap?: TileMap}

export type SpriteMap = {
  row: number;
  column: number;
  width: number;
  height: number;
  type?: number;
  params?: SpriteParams; 
}[];
