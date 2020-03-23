import {
  createReducer,
  createHandlers,
  createProductPriceKey
} from "../../utils";
import { Map } from "immutable";
import { fromPairs, always } from "ramda";
import * as CART_ACTIONS from "../../actionTypes/cart";
import * as OVERLAY_ACTIONS from "../../actionTypes/overlay";

const initialState = new Map();

const setProductOptionPrices = (state, id, options) =>
  options.reduce(
    (state, { id: selectedOption, prices }) =>
      state.set(
        createProductPriceKey({ id, selectedOption }),
        fromPairs(prices.map(({ currency, amount }) => [currency, amount]))
      ),
    state
  );

const handlers = createHandlers({
  [CART_ACTIONS.ADD_PRODUCT]: (state, { product: { id }, options }) =>
    setProductOptionPrices(state, id, options),
  [OVERLAY_ACTIONS.SET_PRODUCT_TOPPING]: (state, { id, prices }) =>
    setProductOptionPrices(state, id, [{ id: 0, prices }]),
  [CART_ACTIONS.SET_PRICES]: (state, { id, options }) =>
    setProductOptionPrices(state, id, options),
  [CART_ACTIONS.REMOVE_ALL_PRODUCTS]: always(initialState)
});

export default createReducer(initialState, handlers);
