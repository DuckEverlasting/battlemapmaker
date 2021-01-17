import { GenerateMap } from "../actions/GenerateMap";
import { App } from "../system";
import { Modal } from "./Modal";

export class WelcomeModal extends Modal {
  constructor(app: App) {
    super(
      app,
      "Welcome",
      [{
        text: "Generate Random Map",
        onClick: () => {
          new GenerateMap(this.app).run()
          this.close();
        }
      }, {
          text: "Start From Scratch",
          onClick: () => this.close()
      }]
    );
  }
}
