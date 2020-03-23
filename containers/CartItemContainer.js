import withDataLoader from "../hocs/withDataLoader";
import CartItem from "../components/Cart/CartItem";
import gql from "graphql-tag";
import { changeProductQuantity } from "../src/actions/cart";
import { useQuery } from "@apollo/react-hooks";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { cartProductsSelector, productPriceSelector } from "../src/selectors";

const GET_PRODUCT_QUERY = gql`
  query Product($id: String!) {
    product: getProduct(id: $id) {
      id
      name
      description
      maxQuantity
      availableOptions: options {
        id
        attr
      }
      availableTopings: toppings {
        id
        name
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
