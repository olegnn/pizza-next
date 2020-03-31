import { useRouter } from "next/router";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import Cart from "../components/Cart/Cart";
import RightDrawer from "../components/RightDrawer";
import { toggleDrawer, DRAWERS } from "../src/actions/ui";
import {
  cartProductsSelector,
  cartTotalSelector,
  isRightDrawerOpenSelector
} from "../src/selectors";
import CartItemContainer from "./CartItemContainer";
import { removeAllProducts } from "../src/actions/cart";

export default function RightDrawerContainer({ children, ...props }) {
  const dispatch = useDispatch();
  const isRightDrawerOpen = useSelector(isRightDrawerOpenSelector);
  const handleToggle = useCallback(
    () => void dispatch(toggleDrawer(DRAWERS.RIGHT))
  );

  return (
    <RightDrawer
      width="600px"
      open={isRightDrawerOpen}
      onClickToggle={handleToggle}
      {...props}
    >
      {children}
    </RightDrawer>
  );
}
