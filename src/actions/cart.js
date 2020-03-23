import {
  __,
  assocPath,
  pipe,
  assoc,
  zipObj,
  always,
  propSatisfies,
  fromPairs
} from "ramda";
import { Record } from "immutable";
import * as CART_ACTIONS from "../actionTypes/cart";
import { Product } from "../types";

export const addProduct = (product, maxQuantity, options) => ({
  type: CART_ACTIONS.ADD_PRODUCT,
  payload: {
    product: Product(product),
    maxQuantity,
    options
  }
});
/*pipe(
  converge(merge, [Product, ]),
  assocPath(["payload", "product"], __, {
    type: CART_ACTIONS.ADD_PRODUCT
  })
);*/

export const removeProduct = assocPath(["payload", "productKey"], __, {
  type: CART_ACTIONS.REMOVE_PRODUCT
});

export const changeProductQuantity = pipe(
  Array,
  zipObj(["productKey", "quantity", "maxQuantity"]),
  assoc("payload", __, { type: CART_ACTIONS.CHANGE_PRODUCT_QUANTITY })
);

export const removeAllProducts = always({
  type: CART_ACTIONS.REMOVE_ALL_PRODUCTS
});

/*converge(
    assoc("payload", __, { type: CART_ACTIONS.CHANGE_PRODUCT_QUANTITY }),
    [assoc("productKey", __, {}), assoc("quantity", __, {})]
);*/

//export const // productKey => ({ type: CART_ACTIONS.REMOVE_PRODUCT, payload: { productKey }});
