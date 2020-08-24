export type AppType = {

}

export type MouseInput = {

}

export type KeyInput = string;

export type Keyboard = {
  [key: string]: Callable;
};

export type Tool = {
  isActive: boolean;
  start(input: MouseInput): void;
  update(input: MouseInput): void;
  end(input: MouseInput): void;
}

export type PanZoomTool = Tool & {
  wheel(input: MouseInput): void;
}

export type Toolbox = {
  [key: string]: Tool;
  move: PanZoomTool;
  zoom: PanZoomTool;
};

export type Callable = {
  run(params?: object): void;
}

export type Renderable = {
  render(): void;
}