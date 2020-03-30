import { identity, pipe, nthArg, prop } from "ramda";
import { createHandlers, createReducer } from "../../utils";

const handlers = createHandlers({
  "cart/SET_CURRENCY": pipe(nthArg(1), prop("currency"))
});

export default createReducer("USD", handlers);
