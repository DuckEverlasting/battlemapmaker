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
  protected tile: Vector;
  protected layer: number | null;

  constructor(source: ImageSource, params?: SpriteParams) {
    this.id = `${Date.now()}`;
    this.imageSource = source;
    this.rect = params.rect || new Rect(0, 0, this.imageSource.rect.width, this.imageSource.rect.height);
    this.layer = null;
    this.tile = params.initPosition || new Vector(0, 0);
  }

  update(state: State) {}

  render(display: Display) {
    if (!this.layer) {return;}
    const t = display.getTranslateData()
    if (
      this.tile.x < 0
      || this.tile.x >= t.rect.width / t.tileWidth
      || this.tile.y < 0
      || this.tile.y >= t.rect.height / t.tileHeight
    ) {
      return;
    }
    display.getLayers()[this.layer].ctx.drawImage(
      this.imageSource.source,
      this.rect.offsetX,
      this.rect.offsetY,
      this.rect.width,
      this.rect.height,
      t.rect.offsetX + (this.tile.x) * t.tileWidth,
      t.rect.offsetY + (this.tile.y) * t.tileHeight,
      t.tileWidth,
      t.tileHeight
    );
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
