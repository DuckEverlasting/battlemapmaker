import { App } from "../system";
import { CalledAction } from "./CalledAction";

export class GenerateMap extends CalledAction {
  constructor(app: App) {
    super(app);
  }

  async run() {
    this.app.startLoading();
    const data = await fetch('https://battle-map-be.herokuapp.com/generate');
    this.app.loadTileMap(await data.json());
    this.app.stopLoading();
  }
}
