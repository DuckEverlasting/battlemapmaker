import { Renderable } from "../types";

export class RenderQueue {
  // may contain some methods? clear method would be useful.
  public array: Renderable[];

  constructor() {
    this.array = [];
  }
}