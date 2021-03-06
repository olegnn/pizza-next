import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useCallback, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { injectIntl } from 'react-intl';

import CartItem from '../components/Cart/CartItem';
import withDataLoader from '../hocs/withDataLoader';
import { changeProductQuantity } from '../app/actions/cart';
import { productPriceSelector } from '../app/selectors';
import { formatPrice } from '../app/formatters';

const GET_PRODUCT_QUERY = gql`
  query Product($id: ID!) {
    product(where: { id: $id }) {
      id
      name
      category
      description
      maxQuantity
      configurations {
        seqId
        attr
      }
      toppings {
        id
        image {
          source
        }
      }
    }
  }
`;

const CartItemWithDataLoader = withDataLoader(CartItem);

export default memo(
  injectIntl(function CartItemContainer({ intl, productKey, id, ...props }) {
    const productQuery = useQuery(GET_PRODUCT_QUERY, {
      variables: { id }
    });
    const dispatch = useDispatch();
    const handleChangeQuantity = useCallback(
      (event, maxQuantity, deleteIfZero) =>
        void dispatch(
          changeProductQuantity(
            productKey,
            +event.target.value,
            maxQuantity,
            deleteIfZero
          )
        ),
      [dispatch, productKey]
    );

    const price = formatPrice(
      intl,
      useSelector(productPriceSelector(productKey))
    );

    return (
      <CartItemWithDataLoader
        {...props}
        query={productQuery}
        price={price}
        onChangeQuantity={handleChangeQuantity}
      />
    );
  })
);
