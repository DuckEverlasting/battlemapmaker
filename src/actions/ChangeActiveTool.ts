import { CalledAction } from "./CalledAction";
import { App } from "../system";

export class ChangeActiveTool extends CalledAction {
  constructor(app: App) {
    super(app);
  }

  run(params: object) {
  }
}