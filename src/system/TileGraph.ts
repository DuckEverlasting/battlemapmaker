import { Sprite } from "../graphics";

/* Notes / further musings.
  - Need a plan for this section, and how it relates to RenderQueue
  - Do I combine the two of them? Wouldn't be too hard to just stick a set for each layer onto the TileGraph
  - Or I could put a TileGraph into the RenderQueue
  - Either way, I'm feeling fairly certain that one should control the other. I shouldn't have to make a call to both of them for every action.
  - TileGraph's strengths are mostly going to be for manipulation stuff. Provides easier / faster ways to look up what is where.
  - So. Structures we have going:
    - Media[] is where ImageSources are stored.
    - Sprites[] is where created Sprites are stored (even ones that are not currently used).
    - RenderQueue is CURRENTLY where everything that is currently on the map is stored.
    - TileGraph is a place to more easily organize what is on the map. Provides for 0(1) lookup for occupants of a specific tile.
    - Will there be a need to grab sprites by their id? I'm actually not sure there will be. So TileGraph is def the way to go.
    - Get some decent manipulation methods on there. Maybe some way to manipulate a group based on a selection.
    - I think in the interest of single state and such, that TileGraph should be the source of truth. RenderQueue (or 
      just the Renderer if the queue is no longer needed) can get it's info from the sets I'll weave into TileGraph.
    - This... sounds like a good idea. Organizationally, it will provide:
      - Easy way to look at what Sprites are at specific locations on the map.
      - Efficient lists (sets) of what Sprites are on the map. (don't have to iterate through all the nulls = faster.)
    - What else will be needed? I'm... not sure. Look into how pixels on the canvas are used in the first place. Might be something missed.
    - Hey wait is this the damn TileMap? A collection of them I guess. Oy. I suppose a map would be getting it into a json.
*/

export class TileGraph {
  public readonly rows: number;
  public readonly columns: number;
  private graph: (Sprite | null)[][];
  // To add: layer sets
  // To add: marked for render array
  // To add: a bunch of methods from RenderQueue

  constructor(rows: number, columns: number, layerCount: number) {
    this.graph = new Array<Array<Sprite | null>>(rows * columns);
    for (let i = 0; i < this.graph.length; i++) {
      this.graph[i] = new Array<Sprite | null>(layerCount).fill(null);
    }
  }

  get(x: number, y: number, layer: number) {}

  add(sprite: Sprite, x: number, y: number, layer: number) {}

  remove(x: number, y: number, layer: number) {}

  move(
    origX: number,
    origY: number,
    origLayer: number,
    destX: number,
    destY: number,
    destLayer: number
  ) {
    const sprite = this.graph[this.index(origX, origY)][origLayer];
    if (sprite !== null) {
      this.graph[this.index(destX, destY)][destLayer] = sprite;
      this.graph[this.index(origX, origY)][origLayer]
    }
  }

  private index(x: number, y: number) {
    return this.columns * x + y;
  }
}
