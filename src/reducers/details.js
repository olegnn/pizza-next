import { Record } from "immutable";
import { always } from "ramda";
import { createReducer, createHandlers } from "../utils";
import * as DETAILS_ACTIONS from "../actionTypes/details";
import { Details } from "../types";

const initialState = Details();

const handlers = createHandlers({
  [DETAILS_ACTIONS.CHANGE]: (state, { field, value }) =>
    state.set(field, value),

  [DETAILS_ACTIONS.CLEAR]: always(initialState)
});

export default createReducer(initialState, handlers);
