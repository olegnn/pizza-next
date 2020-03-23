import { Container } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import { Toolbar } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import AppBar from "../components/AppBar";
import Cart from "../components/Cart/Cart";
import Menu from "../components/Menu";
import BadgeCartContainer from "../containers/BadgeCartContainer";
import CartItemContainer from "../containers/CartItemContainer";
import { removeAllProducts } from "../src/actions/cart";
import { toggleCart } from "../src/actions/ui";
import { cartTotalSelector, isCartOpenSelector } from "../src/selectors";

const drawerWidth = "200px";

const StyledContainer = styled(Container)`
  margin-top: 100px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  vertical-align: middle;
  padding-left: ${drawerWidth};
`;

const StyledMenuIcon = styled.img`
  max-height: 30px;
  max-width: 30px;
`;

export default function PageContainer({ children }) {
  const router = useRouter();
  const isCartOpen = useSelector(isCartOpenSelector);
  const dispatch = useDispatch();
  const handleToggleCart = useCallback(() => void dispatch(toggleCart()));
  const clearCart = useCallback(() => void dispatch(removeAllProducts()));
  const total = useSelector(cartTotalSelector);
  const handleCheckout = useCallback(
    e => void e.preventDefault() || router.push("/checkout"),
    [router]
  );

  return (
    <>
      <AppBar
        marginLeft={drawerWidth}
        onToggleCart={handleToggleCart}
        header="Pizza store"
      />
      <Menu
        items={[
          {
            name: "Pizza",
            icon: <StyledMenuIcon src="/icons/icons8-pizza-96.png" />,
            onClick: () => void router.push("/pizza")
          },
          {
            name: "Drinks",
            icon: <StyledMenuIcon src="/icons/icons8-bacon-96.png" />,
            onClick: () => void router.push("/drinks")
          },
          {
            name: "Desserts",
            icon: <StyledMenuIcon src="/icons/icons8-bacon-96.png" />,
            onClick: () => void router.push("/desserts")
          }
        ]}
        width={drawerWidth}
      />
      <StyledContainer>{children}</StyledContainer>
      <Cart
        open={isCartOpen}
        total={total}
        Item={CartItemContainer}
        onToggleCart={handleToggleCart}
        onClearCart={clearCart}
        onCheckout={handleCheckout}
      />
    </>
  );
}
// <a target="_blank" href="https://icons8.com/icons/set/chili-pepper">Chili Pepper icon</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
