import { Map } from "immutable";
import * as OVERLAY_ACTIONS from "../actionTypes/overlay";
import { createReducer, createHandlers, toNaturalNum } from "../utils";
import { ProductConfiguration } from "../types";

const initialState = new Map();

const handlers = createHandlers({
  [OVERLAY_ACTIONS.SET_PRODUCT_TOPPING]: (state, { productId, id, amount }) => {
    amount = toNaturalNum(amount);
    return state.update(productId, new ProductConfiguration(), config =>
      amount
        ? config.setIn(["toppings", id], amount)
        : config.deleteIn(["toppings", id])
    );
  },

  [OVERLAY_ACTIONS.SET_PRODUCT_CONFIGURATION]: (state, { productId, seqId }) =>
    state.update(productId, new ProductConfiguration(), config =>
      config.set("selectedConfiguration", seqId)
    ),

  [OVERLAY_ACTIONS.RESET_PRODUCT_CONFIGURATION]: (state, { productId }) =>
    handlers[OVERLAY_ACTIONS.SET_PRODUCT_CONFIGURATION](state, {
      productId,
      seqId: 0
    }),

  [OVERLAY_ACTIONS.REMOVE_ALL_PRODUCT_TOPPINGS]: (state, { productId }) =>
    state.update(
      productId,
      value => value && value.set("toppings", initialState)
    )
});

export default createReducer(initialState, handlers);
