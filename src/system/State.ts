import { Tool, PanZoomTool, Keyboard, Toolbox, TranslateData, MouseInput } from "../types";
import { Vector } from "../util/Vector";
import { Rect } from "../util/Rect";
import { ImageSource, Sprite } from "../graphics";
import { TileMap } from "../graphics/queueables/TileMap";
import { Canvas } from ".";

export class State {
  public rect: Rect;
  public zoom: number = 1;
  public media: {[key: string]: ImageSource};
  public sprites: {[key: string]: Sprite};
  public map: TileMap;
  public cursorPosition = new Vector(0, 0);
  public cursorTile = new Vector(-1, -1);
  public cursorButtons = [false, false, false];
  public activeTool: Tool | null = null;
  public activeLayer = 1;
  public activeSprite: Sprite | null = null;
  public activeSpriteCanvas: Canvas;
  public isDrawing = false;
  public loadedSprites: Sprite[] = [];
  // public selection: Selection;
  // public selectionIsActive = false;
  public middleClickTool: PanZoomTool;
  public wheelTool: PanZoomTool;
  public altWheelTool: PanZoomTool;

  mouseIsInside: boolean;

  constructor(
    width: number,
    height: number,
    public tileWidth: number,
    public tileHeight: number,
    public layerCount: number,
    public toolbox: Toolbox,
    public keyboard: Keyboard
  ) {
    console.log(this.toolbox)
    const clientRect = document
      .getElementById("project_container")
      .getBoundingClientRect();
    this.zoom = 1;
    this.rect = new Rect(
      Math.floor((clientRect.width - width) / 2),
      Math.floor((clientRect.height - height) / 2),
      width,
      height
    );
    this.map = new TileMap(
      Math.floor(this.rect.height / this.tileHeight),
      Math.floor(this.rect.width / this.tileWidth),
      this.layerCount
    );
    this.middleClickTool = this.toolbox.move;
    this.wheelTool = this.toolbox.move;
    this.altWheelTool = this.toolbox.zoom;
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
