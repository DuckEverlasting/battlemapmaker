import App from "../system/App";
import { Callable } from "../types";

export default abstract class CalledAction implements Callable {
  run(app: App) {}
}