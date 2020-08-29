import { Renderable } from '../../types';
import { ImageSource } from '../sources/ImageSource';
import { Display } from '../../system';
import { Rect } from '../../util/Rect';
import { Queueable } from '../queueables/Queueable';

export class ImageObject implements Renderable {
  public readonly id: string;
  public container: Queueable;

  constructor(public readonly imageSource: ImageSource) {
    this.id = `${Date.now()}`;
  }

  render(display: Display, props: {rect: Rect, layer: number}) {
    const t = display.getTranslateData()
    display.getLayers()[props.layer].ctx.drawImage(
      this.imageSource.source,
      this.imageSource.rect.offsetX,
      this.imageSource.rect.offsetY,
      this.imageSource.rect.width,
      this.imageSource.rect.height,
      t.rect.offsetX + props.rect.offsetX,
      t.rect.offsetY + props.rect.offsetY,
      props.rect.width,
      props.rect.height
    );
  }
}
