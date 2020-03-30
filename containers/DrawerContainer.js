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

export default function DrawerContainer({ children, ...props }) {
  const dispatch = useDispatch();
  const isDrawerOpen = useSelector(isDrawerOpenSelector);
  const handleToggle = useCallback(() => void dispatch(toggleDrawer()));

  return (
    <RightDrawer
      width="600px"
      open={isDrawerOpen}
      onClickToggle={handleToggle}
      {...props}
    >
      {children}
    </RightDrawer>
  );
}
