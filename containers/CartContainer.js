import { Typography, CircularProgress } from "@material-ui/core";
import { propEq, path } from "ramda";
import gql from "graphql-tag";
import { memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { injectIntl } from "react-intl";
import { useQuery } from "@apollo/react-hooks";

import CartActionGroup from "../components/Cart/CartActionGroup";
import Cart from "../components/Cart/Cart";
import RightDrawer from "../components/RightDrawer";
import { toggleDrawer, DRAWERS } from "../app/actions/ui";
import {
  cartProductsSelector,
  cartTotalSelector,
  isRightDrawerOpenSelector
} from "../app/selectors";
import CartItemContainer from "./CartItemContainer";
import { removeAllProducts } from "../app/actions/cart";
import withDataLoader from "../hocs/withDataLoader";
import CurrencySwitcherContainer from "./CurrencySwitcherContainer";
import { formatPrice } from "../app/formatters";
import { addPrices } from "../app/utils";

const DELIVERY_STATE_QUERY = gql`
  query State {
    state {
      deliveryPrice {
        currency
        amount
      }
    }
  }
`;

export default memo(
  injectIntl(function CartContainer({ intl, showActions, ...props }) {
    const dispatch = useDispatch();
    const products = useSelector(cartProductsSelector);
    const deliveryStateQuery = useQuery(DELIVERY_STATE_QUERY);

    const clearCart = useCallback(() => void dispatch(removeAllProducts()), [
      dispatch
    ]);
    const total = useSelector(cartTotalSelector);

    if (deliveryStateQuery.loading) {
      return <CircularProgress />;
    } else if (deliveryStateQuery.error) {
      return (
        <Typography> Error: {deliveryStateQuery.error.message} </Typography>
      );
    } else {
      const totalPlusDelivery = total.amount
        ? `Total: ${formatPrice(
            intl,
            addPrices(
              total,
              deliveryStateQuery.data.state.deliveryPrice.find(
                propEq("currency", total.currency)
              )
            )
          )} (+${formatPrice(
            intl,
            deliveryStateQuery.data.state.deliveryPrice.find(
              propEq("currency", total.currency)
            )
          )} for delivery)`
        : `Total: ${formatPrice(intl, total)}`;

      return (
        <Cart
          total={totalPlusDelivery}
          products={products}
          Item={CartItemContainer}
          actions={
            showActions && (
              <CartActionGroup
                show={total.amount}
                onClickClear={clearCart}
                checkoutUrl="/checkout"
                checkoutText="Checkout"
                clearText="Clear"
              />
            )
          }
          {...props}
        >
          <CurrencySwitcherContainer />
        </Cart>
      );
    }
  })
);
