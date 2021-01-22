import { ImageSource } from "..";
import { State, Display, App } from "../../system";
import { QueueableFlag } from "../../types";
import { vect } from "../../util/Vector";
import { Queueable } from "./Queueable";
import { getCursors, LAYER } from "../../enums";

import defaultCursor from "../../media/cursors/arrow-basic.png";
import { loadImage } from "../../util/helpers";
import { Keyboard } from "../../system/Keyboard";

export class Cursor extends Queueable {
  protected flags: QueueableFlag[] = ["updateOnCursorMove"];
  private markedForRender: boolean = false; // Does not render until triggered
  private position = vect(-1, -1);
  private icons: {[key: string]: ImageSource | ((keyboard: Keyboard) => ImageSource)} = {};

  constructor(private app: App, private imageSource?: ImageSource | ((keyboard: Keyboard) => ImageSource)) {
    super(new Set([LAYER.CURSOR]));
    if (imageSource) {
      this.loadCursor("default", imageSource);
    } else {
      this.loadCursorFromImage("default", defaultCursor);
    }
    this.setCursor("default");
    getCursors().then(icons => this.icons = {...this.icons, ...icons});
  }

  render(display: Display, props: {layer: number}) {
    if (!this.imageSource || LAYER.CURSOR !== props.layer) {return;}
    const source = typeof this.imageSource === "function" ?
      this.imageSource(this.app.getState().keyboard).source :
      this.imageSource.source;
    display.getLayers()[LAYER.CURSOR].ctx.drawImage(
      source,
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

  setCursor(key: string) {
    this.imageSource = this.icons[key] || this.icons.default;
  }

  loadCursor(key: string, source: ImageSource | ((keyboard: Keyboard) => ImageSource)) {
    this.icons[key] = source;
  }

  async loadCursorFromImage(key: string, uri: string) {
    const source = await loadImage(uri);
    this.icons[key] = source;
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
