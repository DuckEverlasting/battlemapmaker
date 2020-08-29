import SpriteSheet_1 from "../media/spritesheets/SpriteSheet_1.png"
import { ImageSource, TileOutline, SpriteSheet, Sprite } from "../graphics";
import { App, Canvas, TileMap } from "../system";
import { ImageObject } from "../graphics/renderables/ImageObject";
import { BGImage } from "../graphics/queueables/BGImage";

export function testRun(app: App) {
  // make CursorOutline with Sprite using canvas imagesource
  const outline = new Canvas("offscreen", app.getState().tileWidth, app.getState().tileHeight);
  outline.ctx.lineWidth = 10;
  outline.ctx.strokeRect(0, 0, outline.element.width, outline.element.height);
  const outlineSource = new ImageSource(outline.element);
  outlineSource.source
  const outlineSprite = new Sprite(outlineSource);
  const tileOutline = new TileOutline(outlineSprite, app.getState().layerCount - 1)

  // make background ImageObject using canvas imagesource
  const bg = new Canvas("offscreen", 10, 10);
  bg.ctx.fillStyle = "rgb(200,200,240)";
  bg.ctx.fillRect(0, 0, outline.element.width, outline.element.height);
  const bgSource = new ImageSource(bg.element);
  const bgObject = new ImageObject(bgSource);
  const bgImage = new BGImage(bgObject);

  // make TileMap with Sprites using SpriteSheet
  const spriteSheetImg = new Image(SpriteSheet_1.width, SpriteSheet_1.height);
  spriteSheetImg.src = SpriteSheet_1;
  spriteSheetImg.onload = () => {
    const spriteSheet = new SpriteSheet(spriteSheetImg, 32, 32);
    const rows = Math.floor(app.getState().rect.height / app.getState().tileHeight),
      columns = Math.floor(app.getState().rect.width / app.getState().tileWidth)
    const tileMap = new TileMap(rows, columns, app.getState().layerCount);
    tileMap.add(spriteSheet.getSprite(1), 3, 5, 2);
    tileMap.add(spriteSheet.getSprite(1), 4, 7, 2);
    tileMap.add(spriteSheet.getSprite(3), 1, 0, 2);
    tileMap.add(spriteSheet.getSprite(4), 1, 0, 2);
  
    // add TileMap, CursorOutline, ImageObject to queue
    app.getQueue().add(tileOutline, bgImage, tileMap);
  };
}
