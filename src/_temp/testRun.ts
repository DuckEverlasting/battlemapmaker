import BaseChip from "../media/spritesheets/BaseChip_pipo.png";
import Terrain_1 from "../media/spritesheets/Dirt1_pipo.png";
import Terrain_2 from "../media/spritesheets/Dirt2_pipo.png";
import Terrain_3 from "../media/spritesheets/Dirt4_pipo.png";
import Terrain_4 from "../media/spritesheets/Grass1_pipo.png";
import Autotile_Test from "../media/spritesheets/A_Dirt1_pipo.png";
import Small_Dead_Tree from "../media/spritesheets/Small_Dead_Tree.png";
import { ImageSource, ImageObject, TileOutline, SpriteSheet, BGImage, Autotile, Sprite } from "../graphics";
import { App, Canvas } from "../system";
import { loadImage } from "../util/helpers";
import { SPRITE_TYPE } from "../enums";
import { Rect } from "../util/Rect";

export async function testRun(app: App) {
  // make CursorOutline with Sprite using canvas imagesource
  const tileOutline = new TileOutline(app, "#291F1E");

  // make background ImageObject using canvas imagesource
  const bg = new Canvas("offscreen", 10, 10);
  bg.ctx.fillStyle = "rgb(200,200,240)";
  bg.ctx.fillRect(0, 0, bg.element.width, bg.element.height);

  const bgSource = new ImageSource(bg.element),
    bgObject = new ImageObject(bgSource),
    bgImage = new BGImage(bgObject);

  const terrain1 = new SpriteSheet(await loadImage(Terrain_1), SPRITE_TYPE.TERRAIN, 32, 32),
    terrain2 = new SpriteSheet(await loadImage(Terrain_2), SPRITE_TYPE.TERRAIN, 32, 32),
    terrain3 = new SpriteSheet(await loadImage(Terrain_3), SPRITE_TYPE.TERRAIN, 32, 32),
    terrain4 = new SpriteSheet(await loadImage(Terrain_4), SPRITE_TYPE.TERRAIN, 32, 32),
    base = new SpriteSheet(await loadImage(BaseChip), SPRITE_TYPE.OBJECT, 32, 32);
  const autotile = new Autotile(new ImageSource(await loadImage(Autotile_Test)), SPRITE_TYPE.TERRAIN, [
    new Rect(0, 0, 32, 32),
    new Rect(128, 64, 32, 32),
    new Rect(32, 0, 32, 32),
    new Rect(160, 64, 32, 32),
    new Rect(128, 0, 32, 32),
    new Rect(128, 32, 32, 32),
    new Rect(160, 0, 32, 32),
    new Rect(160, 32, 32, 32),
    new Rect(96, 0, 32, 32),
    new Rect(224, 64, 32, 32),
    new Rect(64, 0, 32, 32),
    new Rect(192, 64, 32, 32),
    new Rect(224, 0, 32, 32),
    new Rect(224, 32, 32, 32),
    new Rect(192, 0, 32, 32),
    new Rect(192, 32, 32, 32)
  ]);
  const offsetSprite = new Sprite(new ImageSource(await loadImage(Small_Dead_Tree)), SPRITE_TYPE.OBJECT, new Rect(0, 0, 32, 32), 1, 1, 10, 10);

  autotile.setId("2");
  terrain4.getSprite(4).setId("1");
  base.getSprite(41).setId("3");

    // tileMap.add(sheet.getSprite(index), vector, 2);

  app.getState().loadSprites(
    autotile,
    ...base.getAllSprites(),
    ...terrain1.getAllSprites(),
    ...terrain2.getAllSprites(),
    ...terrain3.getAllSprites(),
    ...terrain4.getAllSprites()
  );

  app.getState().setPalleteSprite(SPRITE_TYPE.TERRAIN, 0, autotile);
  app.getState().setPalleteSprite(SPRITE_TYPE.TERRAIN, 1, terrain1.getSprite(4));
  app.getState().setPalleteSprite(SPRITE_TYPE.TERRAIN, 2, terrain1.getSprite(1));
  app.getState().setPalleteSprite(SPRITE_TYPE.TERRAIN, 3, terrain1.getSprite(2));
  app.getState().setPalleteSprite(SPRITE_TYPE.TERRAIN, 4, terrain4.getSprite(4));
  app.getState().setPalleteSprite(SPRITE_TYPE.TERRAIN, 5, terrain4.getSprite(0));
  app.getState().setPalleteSprite(SPRITE_TYPE.TERRAIN, 6, terrain4.getSprite(1));
  app.getState().setPalleteSprite(SPRITE_TYPE.TERRAIN, 7, terrain4.getSprite(2));

  app.getState().setPalleteSprite(SPRITE_TYPE.OBJECT, 0, base.getSprite(41));
  app.getState().setPalleteSprite(SPRITE_TYPE.OBJECT, 1, offsetSprite);
  app.getState().setPalleteSprite(SPRITE_TYPE.OBJECT, 2, base.getSprite(45));
  app.getState().setPalleteSprite(SPRITE_TYPE.OBJECT, 3, base.getSprite(53));
  app.getState().setPalleteSprite(SPRITE_TYPE.OBJECT, 4, base.getSprite(54));
  app.getState().setPalleteSprite(SPRITE_TYPE.OBJECT, 5, base.getSprite(55));
  app.getState().setPalleteSprite(SPRITE_TYPE.OBJECT, 6, base.getSprite(155));
  app.getState().setPalleteSprite(SPRITE_TYPE.OBJECT, 7, base.getSprite(163));

  app.getState().setActiveSprite(0);
  // CursorOutline, ImageObject to queue
  app.getQueue().add(tileOutline, bgImage);
}
