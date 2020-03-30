import { createReducer, createHandlers } from "../utils";
import * as UI_ACTIONS from "../actionTypes/ui";
import { not } from "ramda";
import { UI } from "../types";

const initialState = UI();

const handlers = createHandlers({
  [UI_ACTIONS.TOGGLE_DRAWER]: state => state.update("drawerOpen", not),
  [UI_ACTIONS.SELECT_PRODUCT]: (state, { id }) =>
    state.update("selectedProduct", id)
});

export default createReducer(initialState, handlers);
