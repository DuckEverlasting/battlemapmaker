import { App } from "../system";

export function changeActiveTool(app: App, params: {name: string}) {
  app.getState().setActiveTool(params.name);
}
