import { App } from "../system";
import { loadImage } from "../util/helpers";
import { SpriteSheet } from "../graphics";
import { SPRITE_TYPE } from "../enums";
import { AutotileCreator } from "../modals/AutotileCreator/AutotileCreator";

export function loadAutotile(app: App) {
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";
  fileInput.addEventListener("change", resolve, false)
  fileInput.click();
  
  async function resolve() {
    const image = await loadImage(URL.createObjectURL(fileInput.files[0]));
    const spriteSheet = new SpriteSheet(image, SPRITE_TYPE.TERRAIN, 32, 32);
    const creator = new AutotileCreator(app);
    app.setModal(creator.element);
    creator.load(spriteSheet);
    fileInput.removeEventListener("change", resolve, false);
  }
}