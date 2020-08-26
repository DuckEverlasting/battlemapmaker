import { Sprite, ImageSource } from ".";
import { State } from "../system";

export class TileOutline extends Sprite {
  constructor(source: ImageSource, params: any={}) {
    super(source, {...params, updateOnTileChange: true});
  }

  update(state: State) {
    this.moveToTile(state.cursorTile);
  }
}