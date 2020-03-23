import withDataLoader from "../hocs/withDataLoader";
import ProductList from "../components/ProductList/ProductList";
import gql from "graphql-tag";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { addProduct } from "../src/actions/cart";
import { Record } from "immutable";
import ProductContainer from "./ProductContainer";
import withPopper from "../hocs/withPopper";
import { useQuery } from "@apollo/react-hooks";

const GET_PRODUCT_LIST = gql`
  query Products($category: Category) {
    products: getProducts(category: $category) {
      id
      name
      maxQuantity
      category
      popularity
      description
      options {
        id
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
      # toppings {
      #    id
      #    name
      #    image {
      #        size
      #        source
      #    }
      # }
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
