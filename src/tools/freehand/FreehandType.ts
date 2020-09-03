import { BaseTool } from '../BaseTool';
import { MouseInput } from '../../types';
import { Vector } from '../../util/Vector';

export abstract class FreehandType extends BaseTool {
  protected latest: Vector | null;

  onStart(input: MouseInput) {
    this.latest = input.tile;
    this.commitStart();
  }

  onUpdate(input: MouseInput) {
    this.latest = input.tile;
    this.commitUpdate();
  }

  onEnd() {
    this.commitEnd();
  }

  commitStart() {}

  commitUpdate() {}

  commitEnd() {}
}
