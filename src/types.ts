import CalledAction from "./actions/CalledAction";

export type AppType = {

}

export type MouseInput = {

}

export type KeyInput = string;

export type Keyboard = {
  [key: string]: CalledAction;
};

export type Tool = {

}

export type Callable = {
  run(app: AppType): void;
}

export type Renderable = {
  render(): void;
}

export type Scrollable = {
  wheel(input: MouseInput): void;
}