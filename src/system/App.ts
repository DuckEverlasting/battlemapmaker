import Display from "./Display";
import State from "./State";
import Renderer from "./Renderer";
import KeyEmitter from "../input/KeyEmitter";
import MouseEmitter from "../input/MouseEmitter";
import InputHandler from "../input/InputHandler";
import { AppType } from "../types";

export default class App implements AppType {
  public display: Display;
  public state: State;
  public renderer: Renderer;
  public keyEmitter: KeyEmitter;
  public mouseEmitter: MouseEmitter;
  public inputHandler: InputHandler;

  constructor(containingElement: HTMLElement) {
    this.display = new Display(containingElement);
    this.state = new State();
    this.renderer = new Renderer(this.display);
    this.keyEmitter = new KeyEmitter(this);
    this.mouseEmitter = new MouseEmitter(this, this.display);
  }
}
