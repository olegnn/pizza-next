import { Map } from 'immutable';
import { fromPairs } from 'ramda';
import { createReducer, createHandlers, toPriceKey } from '../../utils';
import * as CART_ACTIONS from '../../actionTypes/cart';
import * as OVERLAY_ACTIONS from '../../actionTypes/overlay';
import { Product } from '../../types';

const initialState = new Map();

const setProductConfigurationPrices = (state, productId, configurations) =>
  configurations.reduce(
    (state, { seqId, prices }) =>
      state.set(
        toPriceKey(
          new Product({
            id: productId,
            selectedConfiguration: { seqId }
          })
        ),
        fromPairs(prices.map(({ currency, amount }) => [currency, amount]))
      ),
    state
  );

const handlers = createHandlers({
  [CART_ACTIONS.ADD_PRODUCT]: (state, { product: { id }, configurations }) =>
    setProductConfigurationPrices(state, id, configurations),
  [OVERLAY_ACTIONS.SET_PRODUCT_TOPPING]: (state, { id, prices }) =>
    setProductConfigurationPrices(state, id, [{ seqId: 0, prices }]),
  [CART_ACTIONS.SET_PRICES]: (state, { id, configurations }) =>
    setProductConfigurationPrices(state, id, configurations)
});

export default createReducer(initialState, handlers);
