import { useRouter } from "next/router";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { injectIntl } from "react-intl";

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
import { formatPrice } from "../src/formatters";
import { addPrices } from "../src/utils";
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

const DELIVERY = [
  {
    amount: 5,
    currency: "USD"
  },
  {
    amount: 4,
    currency: "EUR"
  }
];

const QUERY = { loading: false };

export default injectIntl(function CartContainer({ delivery, intl, ...props }) {
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
  const totalPlusDelivery = total.amount
    ? `Total: ${formatPrice(
        intl,
        addPrices(total, DELIVERY[0])
      )} (+${formatPrice(intl, DELIVERY[0])} for delivery)`
    : `Total: ${formatPrice(intl, total)}`;

  return (
    <CartWithDataLoader
      total={totalPlusDelivery}
      hideActions={!total.amount}
      query={QUERY}
      {...props}
      products={products}
      Item={CartItemContainer}
      onClearCart={clearCart}
      onCheckout={handleCheckout}
    >
      <CurrencySwitcherContainer />
    </CartWithDataLoader>
  );
});
