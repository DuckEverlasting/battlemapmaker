import { Display } from "./Display";
import { State } from "./State";
import { Renderer } from "./Renderer";
import { EventEmitter, InputHandler } from "../input"
import { AppType } from "../types";
import { getToolbox, getKeyboard } from "../util/helpers";

export class App implements AppType {
  public display: Display;
  public state: State;
  public renderer: Renderer;
  private eventEmitter: EventEmitter;
  private inputHandler: InputHandler;

  constructor(containingElement: HTMLElement) {
    this.display = new Display(containingElement);
    this.state = new State(getToolbox(this), getKeyboard(this));
    this.renderer = new Renderer(this.display);
    this.inputHandler = new InputHandler(this);
    this.eventEmitter = new EventEmitter(this.inputHandler, this.display);
  }
}
