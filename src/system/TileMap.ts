import { Sprite } from "../graphics";
import { SpriteManifest, Display } from "."
import { Renderable } from "../types";

/* Notes / further musings.
  - Need a plan for this section, and how it relates to RenderQueue
  - Do I combine the two of them? Wouldn't be too hard to just stick a set for each layer onto the TileMap
  - Or I could put a TileMap into the RenderQueue
  - Either way, I'm feeling fairly certain that one should control the other. I shouldn't have to make a call to both of them for every action.
  - TileMap's strengths are mostly going to be for manipulation stuff. Provides easier / faster ways to look up what is where.
  - So. Structures we have going:
    - Media[] is where ImageSources are stored.
    - Sprites[] is where created Sprites are stored (even ones that are not currently used).
    - RenderQueue is CURRENTLY where everything that is currently on the map is stored.
    - TileMap is a place to more easily organize what is on the map. Provides for 0(1) lookup for occupants of a specific tile.
    - Will there be a need to grab sprites by their id? I'm actually not sure there will be. So TileMap is def the way to go.
    - Get some decent manipulation methods on there. Maybe some way to manipulate a group based on a selection.
    - I think in the interest of single state and such, that TileMap should be the source of truth. RenderQueue (or 
      just the Renderer if the queue is no longer needed) can get it's info from the sets I'll weave into TileMap.
    - This... sounds like a good idea. Organizationally, it will provide:
      - Easy way to look at what Sprites are at specific locations on the map.
      - Efficient lists (sets) of what Sprites are on the map. (don't have to iterate through all the nulls = faster.)
    - What else will be needed? I'm... not sure. Look into how pixels on the canvas are used in the first place. Might be something missed.
    - Hey wait is this the damn TileMap? A collection of them I guess. Oy. I suppose a map would be getting it into a json.
*/

export class TileMap implements Renderable {
  public readonly id: string;
  private graph: (Sprite | null)[];
  private manifest: SpriteManifest;
  private markedForRender: boolean[];
  
  constructor(
    public readonly rows: number,
    public readonly columns: number,
    public readonly layerCount: number
  ) {
    this.id = `${Date.now()}`;
    this.graph = new Array<Sprite | null>(rows * columns * layerCount).fill(null);
    this.manifest = new SpriteManifest(layerCount);
    this.markedForRender = new Array(layerCount).fill(false);
  }

  public get(x: number, y: number, layer: number) {
    return this.graph[this.ind(x, y, layer)];
  }

  public add(sprite: Sprite, x: number, y: number, layer: number) {
    const index = this.ind(x, y, layer);
    this.manifest.add(sprite, layer);
    if (this.graph[index] !== null) {
      this.manifest.remove(this.graph[index], layer);
    }
    this.graph[this.ind(x, y, layer)] = sprite;
    this.markForRender(layer);
  }

  public remove(x: number, y: number, layer: number) {
    const index = this.ind(x, y, layer);
    const sprite = this.graph[index];
    if (sprite !== null) {
      this.manifest.remove(sprite, layer);
      this.graph[index] = null;
      this.markForRender(layer);
    }
    return sprite;
  }

  public move(
    origX: number,
    origY: number,
    origLayer: number,
    destX: number,
    destY: number,
    destLayer: number
  ) {
    const sprite = this.remove(origX, origY, origLayer);
    this.add(sprite, destX, destY, destLayer);
  }

  private ind(x: number, y: number, layer: number) {
    return (this.columns * x + y) * layer;
  }

  public clearMarkedForRender() {
    this.markedForRender.fill(false);
  }

  public getMarkedForRender(): Array<Set<Sprite>|null> {
    return this.manifest.getLayers().map(
      (layer, i) => !!this.markedForRender[i] ? layer : null
    );
  }

  private markForRender(layer: number) {
    this.markedForRender[layer] = true;
  }

  render(display: Display) {

  }
}
