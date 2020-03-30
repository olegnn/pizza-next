import { always, assocPath, __ } from "ramda";
import * as UI_ACTIONS from "../actionTypes/ui";

export const toggleDrawer = always({ type: UI_ACTIONS.TOGGLE_DRAWER });

export const selectProduct = assocPath(["payload", "id"], __, {
  type: UI_ACTIONS.SELECT_PRODUCT
});
