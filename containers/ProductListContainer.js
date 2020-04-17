import { always } from 'ramda';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { memo } from 'react';

import ToppingsListContainer from './ToppingListContainer';
import ProductList from '../components/ProductList/ProductList';
import withDataLoader from '../hocs/withDataLoader';
import withPopper from '../hocs/withPopper';
import ProductContainer from './ProductContainer';

const GET_PRODUCT_LIST = gql`
  query Products($category: Category) {
    products(where: { category: $category }) {
      id
      name
      maxQuantity
      category
      popularity
      description
      configurations {
        id
        seqId
        attr
        prices {
          currency
          amount
        }
      }
      images {
        source
        alt
      }
      toppings {
        id
        name
        maxQuantity
        prices {
          currency
          amount
        }
      }
    }
  }
`;

const ConfiguredProductList = withDataLoader(ProductList, always(null));

export default memo(
  withPopper(function ProductListContainer({ category, onSelect, ...props }) {
    const productQuery = useQuery(GET_PRODUCT_LIST, {
      variables: { category }
    });

    return (
      <ConfiguredProductList
        {...props}
        Item={ProductContainer}
        query={productQuery}
        onCustomizeProduct={onSelect}
      />
    );
  }, ToppingsListContainer)
);
