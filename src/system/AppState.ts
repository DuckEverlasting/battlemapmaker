import { Tool, PanZoomTool, Keyboard, Toolbox, TranslateData, MouseInput } from "../types";
import { vect, Vector } from "../util/Vector";
import { Rect } from "../util/Rect";
import { ImageSource, Sprite } from "../graphics";
import { Canvas } from ".";
import { LAYER_TYPE } from "../enums";

export class State {
  public zoom: number = 1;
  public media: {[key: string]: ImageSource};
  public sprites: {[key: string]: Sprite}[] = [{}, {}, {}];
  public cursorPosition = vect(0, 0);
  public cursorTile: Vector = null;
  public cursorButtons = [false, false, false];
  public activeTool: Tool | null = null;
  public activeLayer = 1;
  public activeSprite: number[] = [0, 0];
  public pallete: (Sprite | null)[][] = [[], []];
  public activeSpriteCanvas: Canvas;
  public palleteCanvas: Canvas[];
  public isDrawing = false;
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

  getActiveSprite(type = LAYER_TYPE[this.activeLayer]) {
    const activeIndex = this.activeSprite[type];
    return this.pallete[type][activeIndex];
  }

  setActiveLayer(num: number) {
    if (LAYER_TYPE[num] !== LAYER_TYPE[this.activeLayer]) {
      this.setActiveSpriteImage(this.getActiveSprite(LAYER_TYPE[num]));
      this.pallete[LAYER_TYPE[num]].forEach((sprite, i) => {
        this.setPalleteImage(i, sprite);
      })
    }
    this.activeLayer = num;
  }

  loadSprites(...sprites: Sprite[]) {
    sprites.forEach(sprite => {
      this.sprites[sprite.type][sprite.id] = sprite;
    })
  }

  setPalleteSprite(type: number, index: number, sprite: Sprite) {
    this.pallete[type][index] = sprite;
    if (sprite.type === LAYER_TYPE[this.activeLayer]) {
      this.setPalleteImage(index, sprite);
    }
  }

  setPalleteImage(index: number, sprite: Sprite) {
    this.palleteCanvas[index].ctx.clearRect(
      0,
      0,
      this.palleteCanvas[index].element.width,
      this.palleteCanvas[index].element.height
    );
    this.palleteCanvas[index].ctx.drawImage(
      sprite.imageSource.source,
      sprite.rect.offsetX,
      sprite.rect.offsetY,
      sprite.rect.width,
      sprite.rect.height,
      0,
      0,
      this.palleteCanvas[index].element.width,
      this.palleteCanvas[index].element.height
    );
  }

  setActiveSprite(index: number) {
    const type = LAYER_TYPE[this.activeLayer]
    this.setActiveSpriteImage(this.pallete[type][index]);
    this.activeSprite[type] = index;
  }

  setActiveSpriteImage(sprite: Sprite) {
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
