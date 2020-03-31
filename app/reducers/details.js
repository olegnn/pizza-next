import { Record } from "immutable";
import { always } from "ramda";

import * as DETAILS_ACTIONS from "../actionTypes/details";
import { Details } from "../types";
import { createHandlers, createReducer } from "../utils";

const initialState = Details();

const handlers = createHandlers({
  [DETAILS_ACTIONS.SET]: (state, { key, value }) => state.set(key, value),

  [DETAILS_ACTIONS.CLEAR]: always(initialState)
});

export default createReducer(initialState, handlers);
