import { useRouter } from "next/router";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import Cart from "../components/Cart/Cart";
import RightDrawer from "../components/RightDrawer";
import { toggleDrawer } from "../src/actions/ui";
import {
  cartProductsSelector,
  cartTotalSelector,
  isDrawerOpenSelector
} from "../src/selectors";
import CartItemContainer from "./CartItemContainer";
import { removeAllProducts } from "../src/actions/cart";
import withDataLoader from "../hocs/withDataLoader";
import { path } from "ramda";
import gql from "graphql-tag";
import CurrencySwitcherContainer from "./CurrencySwitcherContainer";
import { useQuery } from "@apollo/react-hooks";
/*
const DELIVERY_STATE_QUERY = gql`
  query State {
    state {
      delivery {
        currency
        amount
      }
    }
  }
`;*/

const CartWithDataLoader = withDataLoader(Cart, {
  mapQueryToProps: path(["data", "state"])
});

export default function CartContainer(props) {
  const products = useSelector(cartProductsSelector);
  const router = useRouter();

  const dispatch = useDispatch();
  //const deliveryQuery = useQuery(DELIVERY_STATE_QUERY);

  const clearCart = useCallback(() => void dispatch(removeAllProducts()));
  const total = useSelector(cartTotalSelector);
  const handleCheckout = useCallback(
    e =>
      void e.preventDefault() ||
      void dispatch(toggleDrawer()) ||
      void router.push("/checkout"),
    [router]
  );
  //{/*query={deliveryQuery}*/}

  return (
    <CartWithDataLoader
      delivery={[
        {
          amount: 5,
          currency: "USD"
        },
        {
          amount: 4,
          currency: "EUR"
        }
      ]}
      query={{ loading: false }}
      {...props}
      total={total}
      products={products}
      Item={CartItemContainer}
      onClearCart={clearCart}
      onCheckout={handleCheckout}
    >
      <CurrencySwitcherContainer />
    </CartWithDataLoader>
  );
}
