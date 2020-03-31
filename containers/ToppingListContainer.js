import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { path } from "ramda";
import { useCallback } from "react";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

/// import { ToppingList, ItemSlider } from '../components/ItemGroup';
import ToppingList from "../components/ToppingList/ToppingList";
import withDataLoader from "../hocs/withDataLoader";
import { changeToppingAmount, removeAllProductToppings } from "../app/actions/overlay";
import ToppingSliderContainer from "./ToppingSliderContainer";

const ConfiguredToppingList = withDataLoader(ToppingList, {
  mapQueryToProps: path(["data", "product"])
});

const TOPPING_LIST_QUERY = gql`
  query Product($productId: ID!) {
    product(where: { id: $productId }) {
      id
      toppings {
        id
        name
        maxQuantity
        prices {
          currency
          amount
        }
        image {
          source
        }
      }
    }
  }
`;

export default function ToppingListContainer({ selected: productId }) {
  const dispatch = useDispatch();
  const toppingsQuery = useQuery(TOPPING_LIST_QUERY, {
    variables: { productId }
  });
  const [handleReset, toppingSliderWithId] = useMemo(
    () => [
      () => void dispatch(removeAllProductToppings(productId)),
      props => <ToppingSliderContainer {...props} productId={productId} />
    ],
    [productId]
  );

  return (
    <ConfiguredToppingList
      onReset={handleReset}
      header="Toppings"
      query={toppingsQuery}
      Item={toppingSliderWithId}
    />
  );
}
