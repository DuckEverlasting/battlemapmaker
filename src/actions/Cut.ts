import { CalledAction } from ".";
import { App } from "../system";

export class Cut extends CalledAction {
  constructor(app: App) {
    super(app);
  }

  run(params: object) {
  }
}