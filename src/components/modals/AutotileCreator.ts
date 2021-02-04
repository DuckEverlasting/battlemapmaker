import { SpriteSheet } from "../../graphics";
import { Canvas, App } from "../../system";

export class AutotileCreator {
  element: HTMLElement;
  canvas: Canvas;

  constructor(private app: App) {
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
          <button id="modal-close">Close</button>
        </div>
      </div>
    `;
  }

  load(file: SpriteSheet) {
    const canvasContainer = document.getElementById("modal-canvas-container");
    if (!canvasContainer) {return;}
    const closeButton = document.getElementById("modal-close");
    closeButton.onclick = () => this.app.clearModal();
    canvasContainer.style.width = `${file.rect.width}px`;
    canvasContainer.style.height = `
      ${canvasContainer.clientWidth * (file.rect.height / file.rect.width)}px
    `;
    this.canvas = new Canvas(canvasContainer);
    this.canvas.ctx.drawImage(
      file.source,
      0, 0, file.source.width, file.source.height,
      0, 0, canvasContainer.clientWidth, canvasContainer.clientHeight
    );
  }
}