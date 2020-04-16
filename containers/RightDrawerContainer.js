import { memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

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

export default memo(function RightDrawerContainer({ children, ...props }) {
  const dispatch = useDispatch();
  const isRightDrawerOpen = useSelector(isRightDrawerOpenSelector);
  const handleToggle = useCallback(
    () => void dispatch(toggleDrawer(DRAWERS.RIGHT)),
    [dispatch]
  );

  return (
    <RightDrawer
      open={isRightDrawerOpen}
      onClickToggle={handleToggle}
      {...props}
    >
      {children}
    </RightDrawer>
  );
});
