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

export const addProduct = (product, maxQuantity, configurations) => ({
  type: CART_ACTIONS.ADD_PRODUCT,
  payload: {
    product: new Product(product),
    maxQuantity,
    configurations
  }
});

export const removeProduct = assocPath(["payload", "productKey"], __, {
  type: CART_ACTIONS.REMOVE_PRODUCT
});

export const changeProductQuantity = (
  productKey,
  quantity,
  maxQuantity,
  deleteIfZero = false
) => ({
  payload: {
    productKey,
    quantity,
    maxQuantity,
    deleteIfZero
  },
  type: CART_ACTIONS.CHANGE_PRODUCT_QUANTITY
});

export const removeAllProducts = always({
  type: CART_ACTIONS.REMOVE_ALL_PRODUCTS
});

export const setCurrency = assocPath(["payload", "currency"], __, {
  type: CART_ACTIONS.SET_CURRENCY
});
