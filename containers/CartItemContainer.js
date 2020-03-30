import CartItem from "../components/Cart/CartItem";
import withDataLoader from "../hocs/withDataLoader";
import { changeProductQuantity } from "../src/actions/cart";
import { cartProductsSelector, productPriceSelector } from "../src/selectors";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

const GET_PRODUCT_QUERY = gql`
  query Product($id: ID!) {
    product(where: { id: $id }) {
      id
      name
      category
      description
      maxQuantity
      availableConfigurations: configurations {
        seqId
        attr
      }
      availableToppings: toppings {
        id
        name
        image {
          source
        }
      }
    }
  }
`;

const CartItemWithDataLoader = withDataLoader(CartItem);

export default function CartItemContainer({ productKey, id, ...props }) {
  const productQuery = useQuery(GET_PRODUCT_QUERY, {
    variables: { id }
  });
  const dispatch = useDispatch();
  const handleChangeQuantity = useCallback(
    (event, maxQuantity) =>
      void dispatch(
        changeProductQuantity(productKey, +event.target.value, maxQuantity)
      ),
    [id]
  );
  const price = useSelector(productPriceSelector)(productKey);

  return (
    <CartItemWithDataLoader
      price={price}
      onChangeQuantity={handleChangeQuantity}
      query={productQuery}
      {...props}
    />
  );
}
