import { Renderable, Queueable } from '../../types';
import { ImageSource } from '../sources/ImageSource';
import { Display } from '../../system';
import { Rect } from '../../util/Rect';
import { Vector } from '../../util/Vector';

export class Sprite implements Renderable {
  public readonly id: string;
  public container: Queueable;

  constructor(
    public readonly imageSource: ImageSource,
    public readonly rect: Rect,
    public readonly widthInTiles: number,
    public readonly heightInTiles: number
  ) {
    this.id = `${Date.now()}`;
    this.rect =
      rect ||
      new Rect(0, 0, this.imageSource.rect.width, this.imageSource.rect.height);
  }

  render(display: Display, props: {tile: Vector, layer: number}) {
    const t = display.getTranslateData()
    if (
      props.tile.x < 0
      || props.tile.x >= t.rect.width / t.tileWidth
      || props.tile.y < 0
      || props.tile.y >= t.rect.height / t.tileHeight
    ) {
      return;
    }
    display.getLayers()[props.layer].ctx.drawImage(
      this.imageSource.source,
      this.rect.offsetX,
      this.rect.offsetY,
      this.rect.width,
      this.rect.height,
      t.rect.offsetX + (props.tile.x) * t.tileWidth,
      t.rect.offsetY + (props.tile.y) * t.tileHeight,
      t.tileWidth * this.widthInTiles,
      t.tileHeight * this.heightInTiles
    );
  }
}
