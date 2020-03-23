import { createObjectSelector } from "fun-memoize";
import { prop, pipe, transduce, add, map, __ } from "ramda";
import { calcProductPrice, sumQuantity } from './product';

export const overlaySelector = prop("overlay");

export const cartSelector = prop("cart");

export const uiSelector = prop("ui");

export const detailsSelector = prop("details");

export const cartProductsSelector = pipe(cartSelector, prop("products"));

export const cartPricesSelector = pipe(cartSelector, prop("prices"));

export const cartCurrencySelector = pipe(cartSelector, prop("currency"));

/*export const overlayConfigurtaionSelector = pipe(
  overlaySelector /*, prop('toppings')
);*/

export const selectedProductSelector = pipe(
  uiSelector,
  prop("selectedProduct")
);

export const isCartOpenSelector = pipe(uiSelector, prop("cartOpen"));

export const productInCartCountSelector = createObjectSelector(
  cartProductsSelector,
  pipe(v => v.values(), sumQuantity)
);

export const cartTotalSelector = createObjectSelector(
  [cartProductsSelector, cartPricesSelector, cartCurrencySelector],
  (products, prices, currency) =>
    transduce(
      map(calcProductPrice(__, prices, currency)),
      add,
      0,
      products.values()
    )
);

export const productPriceSelector = createObjectSelector(
  [cartProductsSelector, cartPricesSelector, cartCurrencySelector],
  (products, prices, currency) => productKey =>
    calcProductPrice(products.get(productKey), prices, currency)
);
