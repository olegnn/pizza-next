import { createMemoizedSelector } from 'fun-memoize';
import { prop, pipe, transduce, add, map, __, flip, curryN } from 'ramda';
import { calcProductPrice, sumQuantity } from './product';
import { toPriceKey } from '../utils';

const curry2 = curryN(2);

export const overlaySelector = prop('overlay');

export const cartSelector = prop('cart');

export const uiSelector = prop('ui');

export const detailsSelector = prop('details');

export const cartProductsSelector = pipe(cartSelector, prop('products'));

export const cartPricesSelector = pipe(cartSelector, prop('prices'));

export const cartCurrencySelector = pipe(cartSelector, prop('currency'));

export const selectedElementSelector = pipe(
  uiSelector,
  prop('selectedElement')
);

export const isLeftDrawerOpenSelector = pipe(
  uiSelector,
  prop('leftDrawerOpen')
);

export const isRightDrawerOpenSelector = pipe(
  uiSelector,
  prop('rightDrawerOpen')
);

export const productInCartCountSelector = createMemoizedSelector(
  cartProductsSelector,
  pipe(v => v.values(), sumQuantity)
);

export const cartTotalSelector = createMemoizedSelector(
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

export const productPriceSelector = flip(
  curry2(
    createMemoizedSelector(
      [
        cartProductsSelector,
        cartPricesSelector,
        cartCurrencySelector,
        (_, productKey) => productKey
      ],
      (products, prices, currency, productKey) => ({
        currency,
        amount: calcProductPrice(products.get(productKey), prices, currency)
      })
    )
  )
);

export const productAdditionalCostSelector = flip(
  curry2(
    createMemoizedSelector(
      [
        overlaySelector,
        cartPricesSelector,
        cartCurrencySelector,
        (_, id) => id
      ],
      (overlay, prices, currency, id) => {
        const prodConf = overlay.get(id);

        let amount;
        if (!prodConf) {
          amount = 0;
        } else {
          amount = prodConf.toppings
            .entrySeq()
            .reduce(
              (acc, [id, amount]) =>
                acc + prices.getIn([toPriceKey({ id }), currency]) * amount,
              0
            );
        }

        return {
          currency,
          amount
        };
      }
    )
  )
);
