/// import { ToppingList, ItemSlider } from '../components/ItemGroup';
import ToppingList from "../components/ToppingList/ToppingList";
import { useSelector, useDispatch } from "react-redux";
import {
  changeToppingAmount,
  removeAllProductToppings
} from "../src/actions/overlay";
import withDataLoader from "../hocs/withDataLoader";
import gql from "graphql-tag";
import { useCallback } from "react";
import ToppingSliderContainer from "./ToppingSliderContainer";
import { useMemo } from "react";
import { path } from "ramda";
import { useQuery } from "@apollo/react-hooks";

const ConfiguredToppingList = withDataLoader(ToppingList, {
  mapQueryToProps: path(["data", "getProduct"])
});

const TOPPING_LIST_QUERY = gql`
  query Product($productId: String!) {
    getProduct(id: $productId) {
      id
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

export default function ProductConfiguratorContainer({ productId }) {
  const dispatch = useDispatch();

  const toppingsQuery = useQuery(TOPPING_LIST_QUERY, {
    variables: { productId }
  });
  const [reset, toppingSliderWithId] = useMemo(
    () => [
      () => void dispatch(removeAllProductToppings(productId)),
      props => <ToppingSliderContainer {...props} productId={productId} />
    ],
    [productId]
  );

  return (
    <ConfiguredToppingList
      onReset={reset}
      header="Toppings"
      query={toppingsQuery}
      Item={toppingSliderWithId}
    />
  );
}
