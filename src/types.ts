import { Display, State } from './system';
import { Vector } from './util/Vector';
import { Rect } from './util/Rect';

export type AppType = {};

export type RectArgs = Rect[]|number[];

export type DisplayCanvas = HTMLCanvasElement | OffscreenCanvas;

export type MouseInput = {
  position: Vector;
  tile: Vector;
  buttons: boolean[];
};

export type KeyInput = string;

export type TranslateData = {
  rect: Rect;
  zoom: number;
  tileWidth: number;
  tileHeight: number;
};

export type Keyboard = {
  [key: string]: Callable;
};

export type Tool = {
  isActive: boolean;
  start(input: MouseInput): void;
  update(input: MouseInput): void;
  end(input: MouseInput): void;
};

export type PanZoomTool = Tool & {
  wheel(input: MouseInput): void;
};

export type Toolbox = {
  [key: string]: Tool;
  move: PanZoomTool;
  zoom: PanZoomTool;
};

export type Callable = {
  run(params?: object): void;
};

export type Renderable = {
  id: string;
  render(display?: Display, props?: RenderProps): void;
};

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

export type SpriteRenderProps = {tile: Vector, layer: number}

export type SpriteMap = {
  row: number;
  column: number;
  width: number;
  height: number;
  params?: SpriteParams; 
}[];