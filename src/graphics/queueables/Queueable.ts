import { Display, State } from "../../system";
import { Subscription } from "../../types";

export abstract class Queueable {
  public readonly id = `${Math.random()}`;
  public readonly subscriptions: Subscription[] = [];

  constructor(public readonly onLayers: Set<number>){}

  render(display?: Display, props?: any): void {
    throw new Error('Method "render" not implemented.');
  }
  
  update(state: State): void {}
  
  clearMarkedForRender(layer: number): void {
    throw new Error('Method "clearMarkedForRender" not implemented.');
  }

  isMarkedForRender(): number[] {
    throw new Error('Method "isMarkedForRender" not implemented.');
  }
}
