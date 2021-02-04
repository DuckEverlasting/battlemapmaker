import { PalleteButton } from "../components/buttons";
import { PALLETE_BUTTON_COUNT } from "../enums";
import { App } from "../system";

export function getPallete(app: App, element: HTMLElement) {
  const arr = [];
  for (let i = 0; i < PALLETE_BUTTON_COUNT; i++) {
    arr.push(new PalleteButton(app, element, i));
  }
  return arr;
}
