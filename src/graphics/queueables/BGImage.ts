import { Display } from "../../system";
import { ImageObject } from "../renderables/ImageObject";
import { Queueable } from "./Queueable";
import { LAYER } from "../../enums";

export class BGImage extends Queueable {
  private markedForRender: boolean = true;
  private layer = LAYER.BG;
  
  constructor(private content: ImageObject) {
    super(new Set([LAYER.BG]));
  }

  render(display: Display, props: {layer: number}) {
    if (this.layer !== props.layer) {return;}
    const canvas = display.getLayers()[this.layer];
    canvas.ctx.drawImage(
      this.content.imageSource.source,
      0, 0, canvas.element.width, canvas.element.height 
    );
  }

  clearMarkedForRender() {
    this.markedForRender = false;
  }

  isMarkedForRender() {
    return this.markedForRender ? new Set([this.layer]) : new Set<number>();
  }

  getFlags() {
    return [...this.flags]
  }
}