import { Renderable, SpriteRenderProps } from '../../types';
import { ImageSource } from '../sources/ImageSource';
import { Display } from '../../system';
import { Rect } from '../../util/Rect';
import { Vector, vect } from '../../util/Vector';

export class Sprite implements Renderable {
  public id: string;

  constructor(
    public readonly imageSource: ImageSource,
    public readonly type: number,
    public readonly rect: Rect = new Rect(0, 0, imageSource.rect.width, imageSource.rect.height),
    public readonly widthInTiles: number = 1,
    public readonly heightInTiles: number = 1,
    public readonly maxOffsetX: number = 0,
    public readonly maxOffsetY: number = 0
  ) {
    this.id = `${Math.random()}`;
  }

  setId(newID: string) {
    this.id = newID; // TEMPORARY!!! set id back to readonly when done
  }

  render(display: Display, props: SpriteRenderProps) {
    this.renderSprite(display, this.rect, props.tile, props.layer, props.gridOffset);
  }

  renderSprite(display: Display, rect: Rect, tile: Vector, layer: number, gridOffset: Vector = vect(0, 0)) {
    const t = display.getTranslateData()
    if (
      tile.x < 0
      || tile.x >= t.rect.width / t.tileWidth
      || tile.y < 0
      || tile.y >= t.rect.height / t.tileHeight
    ) {
      return;
    }
    display.getLayers()[layer].ctx.drawImage(
      this.imageSource.source,
      rect.offsetX,
      rect.offsetY,
      rect.width,
      rect.height,
      tile.x * t.tileWidth + gridOffset.x,
      tile.y * t.tileHeight + gridOffset.y,
      t.tileWidth * this.widthInTiles,
      t.tileHeight * this.heightInTiles
    );
  }
}
