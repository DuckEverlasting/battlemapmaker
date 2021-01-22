import { ImageSource } from "..";
import { State, Display, App } from "../../system";
import { QueueableFlag } from "../../types";
import { vect } from "../../util/Vector";
import { Queueable } from "./Queueable";
import { getCursors, LAYER } from "../../enums";

import defaultCursor from "../../media/cursors/arrow-basic.png";
import { loadImage } from "../../util/helpers";

export class Cursor extends Queueable {
  protected flags: QueueableFlag[] = ["updateOnCursorMove"];
  private markedForRender: boolean = false; // Does not render until triggered
  private position = vect(-1, -1);
  private icons: {[key: string]: ImageSource} = {};
  private isLoaded = false;

  constructor(private app: App) {
    super(new Set([LAYER.CURSOR]));
    this.loadCursorFromImage("default", defaultCursor).then(() => this.isLoaded = true);
    getCursors().then(icons => this.icons = {...this.icons, ...icons});
  }

  render(display: Display, props: {layer: number}) {
    if (!this.isLoaded || LAYER.CURSOR !== props.layer) {return;}
    const toolName = this.app.getState().activeTool.name;
    const imageSource = this.icons[this.getToolIconKey(toolName)] || this.icons.default;
    display.getLayers()[LAYER.CURSOR].ctx.drawImage(
      imageSource.source,
      this.position.x,
      this.position.y
    );
  }

  update(state: State) {
    if (!this.isLoaded) {return;}
    this.position = vect(state.cursorPosition);
    this.markedForRender = true;
  }

  getToolIconKey(name: string) {
    const keyboard = this.app.getState().keyboard;
    console.log(keyboard.alt)
    switch(name) {
      case "freehand":
        return "arrow";
      case "shape":
        return "arrow";
      case "fill":
        return "arrow";
      case "erase":
        return "arrow";
      case "move":
        return "arrow";
      case "zoom":
        return keyboard.alt ? "zoomOut" : "zoomIn";
      default:
        return "default";
    }
  }

  getPosition() {
    return vect(this.position);
  }

  clearPosition() {
    this.position.x = -1;
    this.position.y = -1;
  }

  loadCursor(key: string, source: ImageSource) {
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
