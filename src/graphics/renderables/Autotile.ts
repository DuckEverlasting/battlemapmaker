import { Sprite, ImageSource, TileMap } from "..";
import { Display } from "../../system";
import { Vector } from "../../util/Vector";
import { SpriteInstance } from "./SpriteInstance";
import { Rect } from "../../util/Rect";

export class Autotile extends Sprite {
  constructor(
    public readonly imageSource: ImageSource,
    public readonly type: number,
    public readonly rectArray: Rect[], // default sprite at index 0
  ) {
    super(imageSource, type, rectArray[0], 1, 1);
  }

  render(display: Display, props: {tile: Vector, layer: number, tileMap: TileMap}) {
    const adjacent = props.tileMap.getAdjacent(props.tile, props.layer);
    const adjValue = this.getAdjValue(adjacent);
    this.renderSprite(display, this.rectArray[adjValue], props.tile, props.layer)
  }

  getAdjValue(array: (SpriteInstance | null)[]) {
    let result = 0;
    [1, 2, 4, 8].forEach((val, i) => {
      if (array[i] === undefined || (array[i] !== null && array[i].sprite.id === this.id)) {
        result |= val;
      }
    })
    return result;
  }
}


  /*
    ADJACENCY PATTERNS (X = occupied space. Up = 1, Right = 2, Down = 4, left = 8)

      -  
    - X -   0
      -  

      X  
    - X -   1
      -  

      -  
    - X X   2
      -  

      X  
    - X X   3
      -  

      -  
    - X -   4
      X  

      X  
    - X -   5
      X  

      -  
    - X X   6
      X  
      
      X  
    - X X   7
      X  

      -  
    X X -   8
      -  

      X  
    X X -   9
      -  

      -  
    X X X   10
      -  

      X  
    X X X   11
      -

      -  
    X X -   12
      X  

      X  
    X X -   13
      X

      -  
    X X X   14
      X  
      
      X  
    X X X   15
      X  
  */
 