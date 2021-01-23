import { Display } from './system';
import { Vector } from './util/Vector';
import { Rect } from './util/Rect';
import { ImageSource, TileMap } from './graphics';
import { Keyboard } from './system/Keyboard';

export type AppType = {};

export type RectArgs = Rect[] | number[];

export type DisplayCanvas = HTMLCanvasElement | OffscreenCanvas;

export type MouseInput = {
  position: Vector;
  tile: Vector;
  buttons: boolean[];
  modifiers: {shift: boolean, alt: boolean, mod: boolean};
  screen: Vector;
};

export type TranslateData = {
  rect: Rect;
  zoom: number;
  marginLeft: number;
  marginTop: number;
  tileWidth: number;
  tileHeight: number;
};

export type Tool = {
  name: string;
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
  setId?: (newId: string) => void
  getSource(): CanvasSource;
  renderSprite(display: Display, rect: Rect, tile: Vector, layer: number, gridOffset?: Vector): void;
}

export type Subscription = "tileChange"|"cursorMove"|"keyDown"|"keyUp"|"click";

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
