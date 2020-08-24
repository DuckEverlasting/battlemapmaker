import { MouseInput } from "../src/types";

export abstract class ToolAction {
  start(input: MouseInput) {
    this.onStart(input);
  };
  update(input: MouseInput) {
    this.onUpdate(input);
  };
  end(input: MouseInput) {
    this.onEnd(input);
  };

  onStart(input: MouseInput) {};
  onUpdate(input: MouseInput) {};
  onEnd(input: MouseInput) {};
}