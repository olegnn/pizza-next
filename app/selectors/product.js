import memoize from 'fun-memoize';
import { curry, transduce, pluck, add, propEq } from 'ramda';
import { toPriceKey } from '../utils';

export const calcProductPrice = curry(
  memoize(
    (product, prices, currency) =>
      product.quantity *
      (prices.getIn([toPriceKey(product), currency]) +
        (product.toppings
          .entrySeq()
          .reduce(
            (acc, [id, amount]) =>
              acc + prices.getIn([toPriceKey({ id }), currency]) * amount,
            0
          ) || 0))
  )
);

export const sumQuantity = transduce(pluck('quantity'), add, 0);

export const getProductQuantityById = memoize((state, productId) =>
  sumQuantity(state.filter(propEq('id', productId)).values())
);
