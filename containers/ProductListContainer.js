import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Record } from "immutable";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProductList from "../components/ProductList/ProductList";
import withDataLoader from "../hocs/withDataLoader";
import withPopper from "../hocs/withPopper";
import { addProduct } from "../src/actions/cart";
import ProductContainer from "./ProductContainer";

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
        weight
        capacity
        prices {
          currency
          amount
        }
      }
      images {
        size
        source
      }
      toppings {
        id
      }
    }
  }
`;

const ConfiguredProductList = withDataLoader(ProductList, () => null);

export default function ProductListContainer({ category, ...props }) {
  const productQuery = useQuery(GET_PRODUCT_LIST, {
    variables: { category }
  });

  return (
    <ConfiguredProductList
      Item={ProductContainer}
      query={productQuery}
      {...props}
    />
  );
}

export const ProductListContainerWithPopper = withPopper(ProductListContainer);