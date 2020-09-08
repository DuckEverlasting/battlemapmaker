import { SpriteSheet } from "../../graphics";
import { Canvas } from "../../system";

export class AutotileCreator {
  active: boolean = false;
  element: HTMLElement;
  canvas: Canvas;

  constructor() {
    this.element = document.createElement("div");
    this.element.innerHTML = `
      <div class="modal-container">
        <div class="modal-main">
          <h3>Import autotile</h3>
          <div class="modal-scrollbox">
            <div id="modal-canvas-container"></div>
          </div>
          <div class="autotile-type-box">
            <label for="autotile-type-selector">Type</label>
            <select name="" id="autotile-type-selector">
              <option selected value="0">default</option>
            </select>
            <div id="autotile-type-preview"></div>
          </div>
        </div>
      </div>
    `;
  }

  load(file: SpriteSheet) {
    const canvasContainer = document.getElementById("modal-canvas-container");
    canvasContainer.style.width = `${file.rect.width}px`;
    canvasContainer.style.height = `${file.rect.height}px`;
    console.log(file)
    console.log(file.rect)
    this.canvas = new Canvas(canvasContainer);
    this.canvas.ctx.drawImage(file.source, 0, 0);
  }
}