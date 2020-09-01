import { App } from "../system";

export function redo(app: App) {
  console.log("GHAAAAAA")
  app.getTileMap().redo();
}