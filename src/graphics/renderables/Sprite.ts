import { Renderable, SpriteRenderProps } from '../../types';
import { ImageSource } from '../sources/ImageSource';
import { Display } from '../../system';
import { Rect } from '../../util/Rect';
import { Queueable } from '../';

export class Sprite implements Renderable {
  public readonly id: string;
  public container: Queueable;

  constructor(
    public readonly imageSource: ImageSource,
    public readonly rect: Rect = new Rect(0, 0, imageSource.rect.width, imageSource.rect.height),
    public readonly widthInTiles: number = 1,
    public readonly heightInTiles: number = 1
  ) {
    this.id = `${Math.random()}`;
  }

  copy() {
    return new Sprite(this.imageSource, this.rect, this.widthInTiles, this.heightInTiles);
  }

  render(display: Display, props: SpriteRenderProps) {
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
      props.tile.x * t.tileWidth,
      props.tile.y * t.tileHeight,
      t.tileWidth * this.widthInTiles,
      t.tileHeight * this.heightInTiles
    );
  }
}
