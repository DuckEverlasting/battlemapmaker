import { Renderable, Queueable } from "../types";

export class RenderQueue {
  private queue = new Set<Queueable>();

  constructor(public readonly layerCount: number) {}

  add(queueable: Queueable) {
    this.queue.add(queueable);
  }

  remove(queueable: Queueable) {
    this.queue.delete(queueable);
  }

  getAllMarkedForRender() {
    const result = new Array<Set<Renderable>>(this.layerCount);
    /* 
      - return marked for render as array of sets
      (not nulls, because empty sets should work fine)
      
      - add all entries to the above array in the
      appropriate place (iterates through everything 
      perhaps unneccesarily, but also prevents anything
      from being rendered twice.)

      - pass that along

      - input handler can now work through the RenderQueue to
      find things that need to react. Can remove unneccesary
      functionality from Sprites, and keep it to only things that
      specifically need it. (Also don't need to check as many things.)

      - this is good, I think. can abstract things away
      from the actual renderer (hopefully) and allow for
      more flexibility in queueable items.

      - queueable items other than TileMap:
        - Display
        - TileOutline
        - Cursor (tbd)
        - Selection (tbd)
        - BackgroundImage (tbd - basically a redo of 
          the current directly renderable Sprite)
        - Overlay (tbd - vfx, probably)
      
      - A lot of refactoring to implement this. Pretty sure
      it's the way to go, though. It's more flexible and less
      brittle. And ultimately it will be less intricate if all
      the things I mention above actually get implemented.

      - A bit of musing: The layers in this queue would represent
      render order if there was only one canvas used. That is still
      a possibility! But this keeps the lower levels from having to be
      rerendered all the time. Of course... the same thing could be done
      that SnapShot is currently doing: Store all the layers as Offscreen
      Canvases, update those as needed, and draw all of them to the main
      canvas every render. This... may be cleaner. And of course allows
      for interesting things like blend effects and group opacity...

      ...

      ...which I realize I'll probably need. Shit. If I want to desaturate
      any level that is not currently active, I'll need a middleman.

      ... okay, I guess that's happening.

      Should probably look into Offscreen Canvases to see what advantages
      they actually offer in terms of storage + performance. I feel like I'm
      not currently using them optimally.
    */
    this.queue.forEach(queueable => {
      queueable.getMarkedForRender();
    });
    return result;
  }
}
