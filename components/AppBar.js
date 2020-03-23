import { Container } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import { Toolbar } from "@material-ui/core";
import { AppBar as MAppBar } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Head from "next/head";
import { useState } from "react";
import { useCallback } from "react";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import BadgeCartContainer from "../containers/BadgeCartContainer";
import CartItemContainer from "../containers/CartItemContainer";
import { removeAllProducts } from "../src/actions/cart";
import { toggleCart } from "../src/actionTypes/ui";
import { cartTotalSelector, isCartOpenSelector } from "../src/selectors";
import Cart from "./Cart/Cart";

const StyledAppBar = styled(MAppBar)`
  margin-top: 0px;
  ${({ leftMargin, rightMargin }) => `
    margin-left: ${leftMargin};
    margin-right: ${rightMargin};
  `}
`;

const MenuButton = styled(Button)`
  margin-right: 30rem;
`;

const Header = styled(Typography)`
  flex-grow: 7;
`;

const LoginButton = styled(Button)`
  color: inherit;
`;

export default memo(function AppBar({
  header,
  rightMargin,
  leftMargin,
  onToggleCart
}) {
  return (
    <StyledAppBar
      leftMargin={leftMargin}
      marginRight={rightMargin}
      position="fixed"
    >
      <Toolbar>
        <Header variant="h6">{header}</Header>
        <LoginButton color="inherit">Login</LoginButton>
        <IconButton aria-label="cart" onClick={onToggleCart}>
          <BadgeCartContainer />
        </IconButton>
      </Toolbar>
    </StyledAppBar>
  );
});
