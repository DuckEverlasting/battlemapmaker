import SpriteSheet_1 from "../media/spritesheets/SpriteSheet_1.png"
import { ImageSource, TileOutline, SpriteSheet } from "../graphics";
import { App, Canvas, TileMap } from "../system";
import { ImageObject } from "../graphics/renderables/ImageObject";
import { BGImage } from "../graphics/queueables/BGImage";
import { loadImage } from "../util/helpers";

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

  // make TileMap with Sprites using SpriteSheet
  // const spriteSheetImg = new Image(SpriteSheet_1.width, SpriteSheet_1.height);
  // spriteSheetImg.src = SpriteSheet_1;
  
  const spriteSheetImg = await loadImage(SpriteSheet_1),
    spriteSheet = new SpriteSheet(spriteSheetImg, 32, 32),
    rows = Math.floor(app.getState().rect.height / app.getState().tileHeight),
    columns = Math.floor(app.getState().rect.width / app.getState().tileWidth),
    tileMap = new TileMap(rows, columns, app.getState().layerCount);
  
  app.getState().loadedSprites.push(
    spriteSheet.getSprite(1),
    spriteSheet.getSprite(2),
    spriteSheet.getSprite(3),
    spriteSheet.getSprite(4),
    spriteSheet.getSprite(5)
  );

  app.getState().setActiveSprite(app.getState().loadedSprites[3]);

  tileMap.add(spriteSheet.getSprite(1), 3, 5, 2);
  tileMap.add(spriteSheet.getSprite(1), 4, 7, 2);
  tileMap.add(spriteSheet.getSprite(3), 1, 0, 2);
  tileMap.add(spriteSheet.getSprite(4), 1, 0, 2);

  // add TileMap, CursorOutline, ImageObject to queue
  app.getQueue().add(tileOutline, bgImage, tileMap);
}
