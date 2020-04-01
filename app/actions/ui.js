import { always, assocPath, __ } from "ramda";
import * as UI_ACTIONS from "../actionTypes/ui";

export const DRAWERS = { LEFT: "LEFT", RIGHT: "RIGHT" };

export const toggleDrawer = assocPath(["payload", "drawer"], __, {
  type: UI_ACTIONS.TOGGLE_DRAWER
});

export const selectElement = assocPath(["payload", "id"], __, {
  type: UI_ACTIONS.SELECT_ELEMENT
});
