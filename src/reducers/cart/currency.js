import { identity } from "ramda";
import { createHandlers, createReducer } from "../../utils";

const handlers = createHandlers({
  "cart/SET_CURRENCY": identity
});

export default createReducer("USD", handlers);
