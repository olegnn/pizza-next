import { Map } from "immutable";
import { always } from "ramda";
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

  [OVERLAY_ACTIONS.SET_PRODUCT_OPTION]: (state, { productId, optionId }) =>
    state.update(productId, new ProductConfiguration(), config =>
      config.set("selectedOption", optionId)
    ),

  [OVERLAY_ACTIONS.RESET_PRODUCT_OPTION]: (state, { productId }) =>
    handlers[OVERLAY_ACTIONS.SET_PRODUCT_OPTION](state, {
      productId,
      optionId: 0
    }),

  /*[OVERLAY_ACTIONS.REMOVE_TOPPING]: (state, { productId, topping }) =>
    amount > 0
      ? state.update(productId, new Map(), v => v.set(topping, amount))
      : state.delete(productId),*/

  [OVERLAY_ACTIONS.REMOVE_ALL_PRODUCT_TOPPINGS]: (state, { productId }) =>
    state.delete(productId)
});

export default createReducer(initialState, handlers);
