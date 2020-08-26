import { Renderable, SpriteParams } from '../types';
import { ImageSource } from './ImageSource';
import { Vector } from '../util/Vector';
import { Display, State } from '../system';
import { Rect } from '../util/Rect';


/* TODO:
  - FIX THINGS
  - Sprite image isn't being cropped out of spritesheet correctly
  - need to zoom sprites to fit properly into tiles (tilewidth property?)
*/
export class Sprite implements Renderable {
  public readonly id: string;
  public readonly imageSource: ImageSource;
  public readonly rect: Rect;
  public readonly updateOnCursorMove: boolean;
  public readonly updateOnTileChange: boolean;
  private tile: Vector;
  private layer: number | null;

  constructor(source: ImageSource, params: SpriteParams) {
    this.id = `${Date.now()}`;
    this.imageSource = source;
    this.rect = params.rect || new Rect(0, 0, this.imageSource.rect.width, this.imageSource.rect.height);
    this.layer = null;
    this.tile = params.initPosition || new Vector(0, 0);
    this.updateOnCursorMove = !!params.updateOnCursorMove;
    this.updateOnTileChange = !!params.updateOnTileChange;
  }

  update(state: State) {}

  render(display: Display) {
    display.renderSprite(this);
  }

  getPosition() {
    return new Vector(this.tile);
  }

  moveTile(delta: Vector) {
    this.tile.add(delta);
  }

  moveToTile(dest: Vector) {
    this.tile.x = dest.x;
    this.tile.y = dest.y;
  }

  getLayer() {
    return this.layer;
  }

  setLayer(newLayer: number) {
    this.layer = newLayer;
  }
}
