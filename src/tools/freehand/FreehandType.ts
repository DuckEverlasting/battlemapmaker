import { BaseTool } from '../BaseTool';
import { MouseInput } from '../../types';
import { Vector } from '../../util/Vector';

export abstract class FreehandType extends BaseTool {
  protected latest: Vector[];

  onStart(input: MouseInput) {
    this.latest = [input.tile];
    this.commitStart();
  }

  onUpdate(input: MouseInput) {
    const newLatest = [input.tile];
    this.commitUpdate();
    this.latest = newLatest;
  }

  onEnd(input: MouseInput) {
    this.commitEnd();
  }

  commitStart() {}

  commitUpdate() {}

  commitEnd() {}
}
