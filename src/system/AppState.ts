import { Tool, PanZoomTool, Keyboard, Toolbox, TranslateData, MouseInput } from "../types";
import { vect } from "../util/Vector";
import { Rect } from "../util/Rect";
import { ImageSource, Sprite } from "../graphics";
import { Canvas } from ".";

export class State {
  public zoom: number = 1;
  public media: {[key: string]: ImageSource};
  public sprites: {[key: string]: Sprite};
  public cursorPosition = vect(0, 0);
  public cursorTile = vect(-1, -1);
  public cursorButtons = [false, false, false];
  public activeTool: Tool | null = null;
  public activeLayer = 2;
  public activeSprite: Sprite | null = null;
  public activeSpriteCanvas: Canvas;
  public isDrawing = false;
  public loadedSprites: Sprite[] = [];
  // public selection: Selection;
  // public selectionIsActive = false;
  public middleClickTool: PanZoomTool;
  public wheelTool: PanZoomTool;
  public altWheelTool: PanZoomTool;
  public toolbox: Toolbox;
  public keyboard: Keyboard;

  mouseIsInside: boolean;

  constructor(
    public rect: Rect,
    public tileWidth: number,
    public tileHeight: number,
    public layerCount: number
  ) {
    this.zoom = 1;
  }

  getTranslateData(): TranslateData {
    return {
      zoom: this.zoom,
      rect: this.rect,
      tileWidth: this.tileWidth,
      tileHeight: this.tileHeight,
    }
  }

  setCursorState(input: MouseInput) {
    this.cursorPosition = input.position;
    this.cursorTile = input.tile;
    this.cursorButtons = input.buttons;
  }

  setActiveTool(name: string) {
    this.activeTool = this.toolbox[name];
  }

  setActiveLayer(num: number) {
    this.activeLayer = num;
  }

  setActiveSprite(sprite: Sprite) {
    this.activeSprite = sprite;
    this.activeSpriteCanvas.ctx.clearRect(
      0,
      0,
      this.activeSpriteCanvas.element.width,
      this.activeSpriteCanvas.element.height
    );
    this.activeSpriteCanvas.ctx.drawImage(
      sprite.imageSource.source,
      sprite.rect.offsetX,
      sprite.rect.offsetY,
      sprite.rect.width,
      sprite.rect.height,
      0,
      0,
      this.activeSpriteCanvas.element.width,
      this.activeSpriteCanvas.element.height
    );
  }
}
