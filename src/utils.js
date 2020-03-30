import memoize from "fun-memoize";
import { Map } from "immutable";
import { sha256 } from "js-sha256";
import { always, assoc, curryN, evolve, map, nthArg, pipe } from "ramda";

export const createReducer = (initialState, handlers) => (
  state = initialState,
  { type, payload }
) => {
  // console.log(type, payload);
  const handler = handlers[type];
  return handler ? handler(state, payload) : state;
};

export const createHandlers = pipe(map(curryN(2)), object =>
  Object.setPrototypeOf(object, null)
);

export const productToKey = ({ id, toppings, selectedConfiguration }) =>
  `${id}@${toppings ? toppings.entrySeq().join("=") : ""}@${
    selectedConfiguration ? selectedConfiguration.seqId : 0
  }`;

export const productToKeyPrefix = ({ id }) => `${id}@`;

export const toNaturalNum = num => Math.max(+num | 0, 0);

export const createProductPriceKey = ({ id, selectedConfiguration }) =>
  `${id}@${selectedConfiguration ? selectedConfiguration.seqId : 0}`;

export const addPrices = (aPrice, bPrice) => {
  if (aPrice.currency !== bPrice.currency) {
    return null;
  } else {
    return { currency: aPrice.currency, amount: aPrice.amount + bPrice.amount };
  }
};

export function hasWindow() {
  try {
    window;
    return true;
  } catch (e) {
    return false;
  }
}
