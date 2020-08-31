import { QueueableFlag } from "../../types";
import { Display, State } from "../../system";

export abstract class Queueable {
  public readonly id = `${Math.random()}`;
  protected flags: QueueableFlag[] = [];

  constructor(public readonly onLayers: Set<number>){}

  render(display?: Display, props?: any): void {
    throw new Error('Method "render" not implemented.');
  }
  
  update(state: State): void {}
  
  clearMarkedForRender(layer: number): void {
    throw new Error('Method "clearMarkedForRender" not implemented.');
  }

  isMarkedForRender(): Set<number> {
    throw new Error('Method "isMarkedForRender" not implemented.');
  }

  getFlags(): QueueableFlag[] {
    return [...this.flags]
  }
}
