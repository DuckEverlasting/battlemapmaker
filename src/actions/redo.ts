import { App } from "../system";

export function redo(app: App) {
  app.getTileMap().redo();
}