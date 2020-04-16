import { Map } from "immutable";
import { curryN, map, pipe } from "ramda";

export const createReducer = (initialState, handlers) => (
  state = initialState,
  { type, payload }
) => {
  const handler = handlers[type];
  return handler ? handler(state, payload) : state;
};

export const createHandlers = pipe(map(curryN(2)), object =>
  Object.setPrototypeOf(object, null)
);

export const toProductKey = ({ id, toppings, selectedConfiguration }) =>
  `${id}@${
    toppings ? toppings.entrySeq().join("=") : ""
  }@${(typeof selectedConfiguration === "object" &&
    selectedConfiguration.seqId) ||
    0}`;

export const toPriceKey = ({ id, selectedConfiguration }) =>
  `${id}@${(typeof selectedConfiguration === "object" &&
    selectedConfiguration.seqId) ||
    0}`;

export const toNaturalNum = num => Math.max(+num | 0, 0);

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

const timeReg = /\d\d\:\d\d/;

export const getCurrentTimeString = () =>
  new Date().toISOString().match(timeReg)[0];

export const timeStringToDate = time =>
  new Date(new Date().toISOString().replace(timeReg, time));
