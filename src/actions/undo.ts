import { App } from "../system";

export function undo(app: App) {
  app.getTileMap().undo();
}