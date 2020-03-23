import * as OVERLAY_ACTIONS from "../actionTypes/overlay";
import { assoc, __, assocPath } from "ramda";

export const changeToppingAmount = (productId, id, amount, prices) => ({
  type: OVERLAY_ACTIONS.SET_PRODUCT_TOPPING,
  payload: {
    productId,
    id,
    amount,
    prices
  }
});

export const setProductOption = (productId, optionId) => ({
  type: OVERLAY_ACTIONS.SET_PRODUCT_OPTION,
  payload: {
    productId,
    optionId
  }
});

export const resetProductOption = assocPath(["payload", "productId"], __, {
  type: OVERLAY_ACTIONS.RESET_PRODUCT_OPTION
});

export const removeAllProductToppings = assocPath(
  ["payload", "productId"],
  __,
  {
    type: OVERLAY_ACTIONS.REMOVE_ALL_PRODUCT_TOPPINGS
  }
);
