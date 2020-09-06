import { Renderable, SpriteRenderProps } from '../../types';
import { ImageSource } from '../sources/ImageSource';
import { Display } from '../../system';
import { Rect } from '../../util/Rect';
import { Queueable } from '../';
import { Vector } from '../../util/Vector';

export class Sprite implements Renderable {
  public readonly id: string;
  public container: Queueable;

  constructor(
    public readonly imageSource: ImageSource,
    public readonly type: number,
    public readonly rect: Rect = new Rect(0, 0, imageSource.rect.width, imageSource.rect.height),
    public readonly widthInTiles: number = 1,
    public readonly heightInTiles: number = 1,
  ) {
    this.id = `${Math.random()}`;
  }

  render(display: Display, props: SpriteRenderProps) {
    this.renderSprite(display, this.rect, props.tile, props.layer);
  }

  renderSprite(display: Display, rect: Rect, tile: Vector, layer: number) {
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
      tile.x * t.tileWidth,
      tile.y * t.tileHeight,
      t.tileWidth * this.widthInTiles,
      t.tileHeight * this.heightInTiles
    );
  }
}
