import { Menu } from "../menu/Menu";
import { MenuAction } from "../menu/MenuAction";
import { undo } from "../actions/undo";
import { redo } from "../actions/redo";
import { MenuBranch } from "../menu/MenuBranch";
import { MenuHandler } from "../menu/MenuHandler";
import { vect } from "./Vector";
import { App } from "../system";
import { loadAutotile } from "../actions/loadAutotile";
import { GenerateMapModal } from "../modals/GenerateMapModal";

export function buildMenu(app: App, menuButtons: {[key: string]: HTMLElement}, menuHandler: MenuHandler) {
  const fileButtonRect = menuButtons.file.getBoundingClientRect();
  menuButtons.file.onclick = e => {
    menuHandler.loadMenu(
      new Menu("file", [
        new MenuAction(
          "Map Generator",
          "GENERATE A MAP",
          () => {
            app.setModal(new GenerateMapModal(app))
          }
        ),
        // new MenuAction(
        //   "Import autotile",
        //   "IMPORT AUTOTIIIIILE",
        //   () => loadAutotile(app)
        // )
      ], menuButtons.file),
      vect(fileButtonRect.left, fileButtonRect.bottom)
    )
  }

  const editButtonRect = menuButtons.edit.getBoundingClientRect();
  menuButtons.edit.onclick = () => {
    menuHandler.loadMenu(
      new Menu("edit", [
      new MenuAction(
        "Undo",
        "UNDO",
        () => undo(app)
      ),
      new MenuAction(
        "Redo",
        "REDO",
        () => redo(app)
      ),
      // new MenuBranch(
      //   "Branch",
      //   new Menu(
      //     "branch", [
      //       new MenuAction(
      //         "Thing",
      //         "THIIIIING",
      //         () => console.log("THIIIIIIIIING")
      //       ),
      //       new MenuAction(
      //         "Other Thing",
      //         "OTHERTHIIIIING",
      //         () => console.log("Other")
      //       )
      //     ]
      //   )
      // )
      ], menuButtons.edit),
      vect(editButtonRect.left, editButtonRect.bottom)
    )
  }
}