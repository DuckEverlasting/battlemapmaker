import { ImageSource } from "..";
import { State, Display, Canvas, App } from "../../system";
import { QueueableFlag } from "../../types";
import { Vector, vect } from "../../util/Vector";
import { Queueable } from "./Queueable";
import { LAYER } from "../../enums";

import defaultCursor from "../../media/cursors/arrow-basic.png";
import { loadImage } from "../../util/helpers";

export class Cursor extends Queueable {
  protected flags: QueueableFlag[] = ["updateOnCursorMove"];
  private markedForRender: boolean = false; // Does not render until triggered
  private position = vect(-1, -1);

  constructor(app: App, private imageSource?: ImageSource) {
    super(new Set([LAYER.CURSOR]));
    if (!imageSource) {
      this.setCursorFromImage(defaultCursor);
    }
  }

  render(display: Display, props: {layer: number}) {
    if (!this.imageSource || LAYER.CURSOR !== props.layer) {return;}
    display.getLayers()[LAYER.CURSOR].ctx.drawImage(
      this.imageSource.source,
      this.position.x,
      this.position.y
    );
  }

  update(state: State) {
    if (!this.imageSource) {return;}
    this.position = vect(state.cursorPosition);
    this.markedForRender = true;
  }

  getPosition() {
    return vect(this.position);
  }

  clearPosition() {
    this.position.x = -1;
    this.position.y = -1;
  }

  setCursor(source: ImageSource) {
    this.imageSource = source;
  }

  async setCursorFromImage(uri: string) {
    const source = await loadImage(uri);
    this.imageSource = new ImageSource(source);
  }

  clearMarkedForRender() {
    this.markedForRender = false;
  }

  isMarkedForRender(): number[] {
    return this.markedForRender ? [LAYER.CURSOR] : [];
  }

  getFlags() {
    return [...this.flags]
  }
}