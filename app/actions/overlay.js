import { __, assoc, assocPath } from "ramda";

import * as OVERLAY_ACTIONS from "../actionTypes/overlay";

export const setProductTopping = (productId, id, amount, prices) => ({
  type: OVERLAY_ACTIONS.SET_PRODUCT_TOPPING,
  payload: {
    productId,
    id,
    amount,
    prices
  }
});

export const setProductConfiguration = (productId, seqId) => ({
  type: OVERLAY_ACTIONS.SET_PRODUCT_CONFIGURATION,
  payload: {
    productId,
    seqId
  }
});

export const resetProductConfiguration = assocPath(
  ["payload", "productId"],
  __,
  {
    type: OVERLAY_ACTIONS.RESET_PRODUCT_CONFIGURATION
  }
);

export const removeAllProductToppings = assocPath(
  ["payload", "productId"],
  __,
  {
    type: OVERLAY_ACTIONS.REMOVE_ALL_PRODUCT_TOPPINGS
  }
);
