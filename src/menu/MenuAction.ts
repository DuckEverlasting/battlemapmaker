import { MenuItem, MenuItemType } from "./MenuItem";

export class MenuAction extends MenuItem implements MenuItemType {
  public disabled = false;

  constructor(
    name: string,
    public hoverText: string,
    private onClick: Function
  ) {
    super(name);
    this.element.onclick = e => {
      if (this.disabled) {
        e.stopPropagation();
      } else {
        this.onClick(e);
      }
    };
    this.element.title = this.hoverText;
    this.element.className = "menu-action"
  }
}