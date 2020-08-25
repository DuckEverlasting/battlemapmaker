import { Renderable } from '../types';
import { ImageSource } from './ImageSource';
import { Vector } from '../util/Vector';
import { Display, State } from '../system';

export class Sprite implements Renderable {
  public readonly id: string;
  public readonly source: ImageSource;
  public readonly updateOnCursorMove: boolean;
  public readonly updateOnTileChange: boolean;
  private tile: Vector;
  private layer: number;

  constructor(
    source: ImageSource,
    layer: number,
    initX = 0,
    initY = 0,
    params: any = {}
  ) {
    this.id = 'SUPFIXTHIS';
    this.source = source;
    this.layer = layer;
    this.tile = new Vector(initX, initY);
    this.updateOnCursorMove = !!params.updateOnCursorMove;
    this.updateOnTileChange = !!params.updateOnTileChange;
  }

  update(state: State) {}

  render(display: Display) {
    display.renderAt(this.source, this.layer, this.tile);
  }

  getPosition() {
    return new Vector(this.tile);
  }

  moveTile(delta: Vector) {
    this.tile.add(delta);
  }

  moveToTile(dest: Vector) {
    this.tile.x = dest.x;
    this.tile.y = dest.y;
  }

  getLayer() {
    return this.layer;
  }

  setLayer(newLayer: number) {
    this.layer = newLayer;
  }
}
