import { createObjectSelector } from "fun-memoize";
import { prop, pipe, transduce, add, map, __ } from "ramda";
import { calcProductPrice, sumQuantity } from "./product";
import { toPriceKey } from "../utils";

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

export const isRightDrawerOpenSelector = pipe(
  uiSelector,
  prop("rightDrawerOpen")
);

export const isLeftDrawerOpenSelector = pipe(
  uiSelector,
  prop('leftDrawerOpen')
);

export const productInCartCountSelector = createObjectSelector(
  cartProductsSelector,
  pipe(v => v.values(), sumQuantity)
);

export const cartTotalSelector = createObjectSelector(
  [cartProductsSelector, cartPricesSelector, cartCurrencySelector],
  (products, prices, currency) => ({
    currency,
    amount: transduce(
      map(calcProductPrice(__, prices, currency)),
      add,
      0,
      products.values()
    )
  })
);

export const productPriceSelector = createObjectSelector(
  [cartProductsSelector, cartPricesSelector, cartCurrencySelector],
  (products, prices, currency) => productKey => ({
    currency,
    amount: calcProductPrice(products.get(productKey), prices, currency)
  })
);

export const productAdditionalCostSelector = createObjectSelector(
  [overlaySelector, cartPricesSelector, cartCurrencySelector],
  (overlay, prices, currency) => id => {
    const prodConf = overlay.get(id);
    let amount;

    if (!prodConf) {
      amount = 0;
    } else {
      amount = prodConf.toppings
        .entrySeq()
        .reduce(
          (acc, [id, v]) =>
            acc + prices.getIn([toPriceKey({ id }), currency]) * v,
          0
        );
    }

    return {
      currency,
      amount
    };
  }
);
