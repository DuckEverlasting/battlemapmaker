import { App } from ".";
import { redo } from "../actions/redo";
import { undo } from "../actions/undo";
import { changeActiveTool } from "../actions/changeActiveTool";
import { modKey } from "../util/helpers";

export class Keyboard {
  public alt = false;
  public shift = false;
  public control = false;
  public meta = false;
  private dictionary: {[key: string]: Function} = {
    'mod-z': () => undo(this.app),
    'mod-shift-z': () => redo(this.app),
    'm': () => changeActiveTool(this.app, {name: 'move'}),
    'g': () => changeActiveTool(this.app, {name: 'fill'}),
    // 'w': () => changeActiveTool(this.app, {name: 'fillSelect'}),
    'f': () => changeActiveTool(this.app, {name: 'freehand'}),
    // 'l': () => changeActiveTool(this.app, {name: 'freehandSelect'}),
    'e': () => changeActiveTool(this.app, {name: 'erase'}),
    // 'p': () => changeActiveTool(this.app, {name: 'polygon'}),
    's': () => changeActiveTool(this.app, {name: 'shape'}),
    // 'M': () => changeActiveTool(this.app, {name: 'shapeSelect'}),
    'z': () => changeActiveTool(this.app, {name: 'zoom'}),
  }

  constructor(private app: App) {}
  
  parseKeyDown(e: KeyboardEvent): void {
    console.log(e, e.key)
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
    if (this.dictionary[result]) {
      this.dictionary[result]();
    };
  }

  parseKeyUp(e: KeyboardEvent) {
    console.log(e, e.key)
    const key = e.key.toLowerCase();
    if (["alt", "shift", "control", "meta"].includes(key)) {
      this[key as "alt"|"shift"|"control"|"meta"] = false;
    }
  }
}
