import { Sprite, ImageSource } from ".";
import { State } from "../system";

export class TileOutline extends Sprite {
  constructor(source: ImageSource, layer: number, initX=0, initY=0, params: any={}) {
    super(source, layer, initX, initY, {...params, updateOnTileChange: true});
  }

  update(state: State) {
    this.moveToTile(state.cursorTile);
  }
}