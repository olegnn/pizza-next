import { identity, pipe, nthArg, prop } from "ramda";
import { createHandlers, createReducer } from "../../utils";
import * as CART_ACTIONS from '../../actionTypes/cart';

const handlers = createHandlers({
  [CART_ACTIONS.SET_CURRENCY]: pipe(nthArg(1), prop("currency"))
});

export default createReducer("USD", handlers);
