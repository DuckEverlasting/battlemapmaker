import { BaseTool } from '../BaseTool';
import { MouseInput } from '../../types';
import { Vector } from '../../util/Vector';

export abstract class FreehandType extends BaseTool {
  protected tiles = new Set<Vector>();
  protected latest: Vector[];

  onStart(input: MouseInput) {
    this.tiles.add(input.position);
    this.latest = [input.position];
    this.commitStart();
  }

  onUpdate(input: MouseInput) {
    const newLatest = [input.position];
    this.tiles.add(input.position);
    this.commitUpdate();
    this.latest = newLatest;
  }

  // onUpdate(input: MouseInput) {
  //   const newLatest = this.latest[
  //     this.latest.length - 1
  //   ].lineTo(
  //     input.position
  //   );
  //   newLatest.forEach((vector) => {
  //     this.tiles.add(vector);
  //   });
  //   this.commitUpdate();
  //   this.latest = newLatest;
  // }

  onEnd(input: MouseInput) {
    this.commitEnd();
  }

  commitStart() {}

  commitUpdate() {}

  commitEnd() {}
}
