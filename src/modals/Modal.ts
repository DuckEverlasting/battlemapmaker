import { Canvas, App } from "../system";

type ModalButton = {
  onClick: (this: GlobalEventHandlers, ev: MouseEvent) => any;
  text: string;
  style?: any;
}

export class Modal {
  element: HTMLElement;
  canvas: Canvas;

  constructor(protected app: App, title: string, buttons: ModalButton[] = [], params: any = {}) {
    this.element = document.createElement("div");
    this.element.className = 'modal-container';
    Object.assign(this.element.style, {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "fixed",
      width: "100vw",
      height: "100vh",
      top: 0,
      left: 0,
      background: "rgba(0, 0, 0, .7)",
      zIndex: 3
    });
    const main = document.createElement('div');
    Object.assign(main.style, {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      position: "relative",
      width: params.width || "auto",
      height: params.height || "auto",
      background: "white",
      borderRadius: "5px",
      overflow: "hidden"
    });
    this.element.appendChild(main);
    const contentBox = document.createElement('div');
    Object.assign(contentBox.style, {
      flexGrow: 1
    });
    const titleElement = document.createElement('h3');
    titleElement.textContent = title;
    Object.assign(titleElement.style, {
      height: "36px",
      background: "#ddd",
      width: "100%",
      margin: 0,
      padding: "24px",
      textAlign: "center",
      fontSize: "30px"
    });
    main.appendChild(titleElement);
    main.appendChild(contentBox);
    this.getContent().forEach(el => contentBox.appendChild(el));
    const buttonBox = document.createElement("div");
    Object.assign(buttonBox.style, {
      display: "flex",
      justifyContent: "center",
      flex: 0,
      margin: "10px"
    });
    main.appendChild(buttonBox);
    buttons.forEach(b => {
      const buttonElement = document.createElement("button");
      buttonElement.onclick = b.onClick;
      buttonElement.innerText = b.text;
      Object.assign(buttonElement.style, {
        margin: "10px",
        padding: "10px",
        fontSize: "16px",
        width: "auto",
        cursor: "pointer"
      });
      if (b.style) {
        Object.assign(buttonElement.style, b.style)
      };
      buttonBox.appendChild(buttonElement);
    });
  }

  getContent() {
    return [document.createElement("div")];
  }

  close() {
    this.app.clearModal();
  }
}
