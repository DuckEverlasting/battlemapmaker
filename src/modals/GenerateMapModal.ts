import { GenerateMap } from "../actions/GenerateMap";
import { App } from "../system";
import { Modal } from "./Modal";

export class GenerateMapModal extends Modal {
  constructor(app: App) {
    super(
      app,
      "Generate Map",
      [{
        text: "Generate",
        onClick: () => {
          new GenerateMap(this.app).run();
          this.close();
      }}, {
        text: "Close",
        onClick: () => this.close()
      }]
    );
  }

  getContent() {
    const testEl = document.createElement("div");
    
    return [testEl];
  }
}
