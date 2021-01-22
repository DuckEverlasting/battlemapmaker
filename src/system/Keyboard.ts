import { App } from ".";
import { redo } from "../actions/redo";
import { undo } from "../actions/undo";
import { modKey } from "../util/helpers";

export class Keyboard {
  public alt = false;
  public shift = false;
  public control = false;
  public meta = false;
  private dictionary: {[key: string]: Function} = {
    'mod-z': () => undo(this.app),
    'mod-shift-z': () => redo(this.app)
  }

  constructor(private app: App) {}
  
  parseKeyDown(e: KeyboardEvent): void {
    const key = e.key.toLowerCase();
    if (["alt", "shift", "control", "meta"].includes(key)) {
      this[key as "alt"|"shift"|"control"|"meta"] = true;
      return;
    }
    let result = "";
    if (modKey(e)) result += "mod-";
    if (e.shiftKey) result += "shift-";
    if (e.altKey) result += "alt-";
    result += e.key.toLowerCase();
    this.dictionary[result]();
  }

  parseKeyUp(e: KeyboardEvent) {
    const key = e.key.toLowerCase();
    if (["alt", "shift", "control", "meta"].includes(key)) {
      this[key as "alt"|"shift"|"control"|"meta"] = false;
    }
  }
}
