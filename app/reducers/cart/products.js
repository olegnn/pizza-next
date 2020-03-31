import { OrderedMap } from "immutable";
import { add, curry, __, pipe, always, dec, propEq } from "ramda";
import * as CART_ACTIONS from "../../actionTypes/cart";
import {
  createReducer,
  toProductKey,
  createHandlers,
  toNaturalNum,
  toProductKeyPrefix
} from "../../utils";
import { getProductQuantityById } from "../../selectors/product";

const initialState = new OrderedMap();

const handlers = createHandlers({
  [CART_ACTIONS.ADD_PRODUCT]: (
    state,
    { product, productKey = toProductKey(product), maxQuantity }
  ) => {
    const updatedState = state.update(productKey, cartProduct =>
      cartProduct
        ? cartProduct.update("quantity", add(toNaturalNum(product.quantity)))
        : product.update("quantity", toNaturalNum)
    );
    if (maxQuantity != null) {
      const productQuantity = getProductQuantityById(updatedState, product.id);

      if (productQuantity > maxQuantity) {
        return state;
      }
    }
    return updatedState;
  },
  [CART_ACTIONS.CHANGE_PRODUCT_QUANTITY]: (
    state,
    { productKey, quantity, maxQuantity, deleteIfZero = false }
  ) => {
    if (typeof quantity !== "number") return state;
    else {
      let deleteProduct = false,
        productId = null;
      const updatedState = state.update(productKey, product => {
        quantity = toNaturalNum(quantity);
        if (product) {
          productId = product.id;
          product = product.set("quantity", quantity);
          deleteProduct = product.quantity < 1;
          return product;
        }
      });
      if (maxQuantity != null && productId != null) {
        const productQuantity = getProductQuantityById(updatedState, productId);

        if (productQuantity > maxQuantity) {
          return state;
        }
      }

      return deleteIfZero && deleteProduct
        ? updatedState.delete(productKey)
        : updatedState;
    }
  },
  [CART_ACTIONS.REMOVE_PRODUCT]: (state, { productKey, quantity }) => {
    if (quantity != null) {
      quantity = toNaturalNum(quantity);

      let deleteProduct = false;
      state = state.update(productKey, product => {
        if (product) {
          product = product.update("quantity", dec(quantity));
          deleteProduct = product.quantity < 1;
          return product;
        }
      });

      if (!deleteProduct) return state;
    }

    return state.delete(productKey);
  },
  [CART_ACTIONS.CHANGE_PRODUCT]: (state, { productKey, product }) => {
    const newProductKey = toProductKey(product);
    if (newProductKey !== productKey) {
      return pipe(
        handlers[CART_ACTIONS.REMOVE_PRODUCT](__, { productKey }),
        handlers[CART_ACTIONS.ADD_PRODUCT](__, { product, productKey })
      )(state);
    } else {
      return state.update(productKey, v => v.merge(product));
    }
  },
  [CART_ACTIONS.REMOVE_ALL_PRODUCTS]: always(initialState)
});

export default createReducer(initialState, handlers);
