import { sha256 } from "js-sha256";
import { Map } from "immutable";
import memoize from "fun-memoize";
import { map, curryN, pipe, evolve, always, nthArg, assoc } from "ramda";

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

export const memoizedSha256 = memoize(sha256);

/*export const constructFromArgs = keys =>
  evolve(keys.reduce((acc, cur, i) => assoc(cur, () => nthArg(i), acc), {}));*/

export const productToKey = ({ id, toppings, selectedOption }) =>
  //memoizedSha256(
  `${id}@${
    toppings ? [...toppings.entries()].join("=") : ""
  }@${selectedOption}`;
//);

export const productToKeyPrefix = ({ id }) => `${id}@`;

export const toNaturalNum = num => Math.max(+num | 0, 0);

export const createProductPriceKey = ({ id, selectedOption }) =>
  `${id}@${selectedOption || 0}`;
