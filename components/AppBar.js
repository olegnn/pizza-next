import { omit, pipe } from "ramda";
import { Container } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import { Toolbar } from "@material-ui/core";
import { AppBar as MAppBar } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Head from "next/head";
import { useState } from "react";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import BadgeCartContainer from "../containers/BadgeCartContainer";
import CartItemContainer from "../containers/CartItemContainer";
import { removeAllProducts } from "../app/actions/cart";
import { cartTotalSelector, isRightDrawerOpenSelector } from "../app/selectors";
import Cart from "./Cart/Cart";

const StyledAppBar = styled(
  pipe(omit(["leftPadding", "rightPadding"]), props => <MAppBar {...props} />)
)`
  margin-top: 0px;
  padding-left: ${({ leftPadding }) => leftPadding}px;
  padding-right: ${({ rightPadding }) => rightPadding}px;
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
  leftPadding,
  rightPadding,
  onToggleLeft,
  onToggleRight
}) {
  return (
    <StyledAppBar
      leftPadding={leftPadding}
      rightPadding={rightPadding}
      position="fixed"
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={onToggleLeft}
          edge="start"
          className=""
        >
          <MenuIcon />
        </IconButton>
        <Header variant="h6">{header}</Header>
        <IconButton aria-label="cart" onClick={onToggleRight}>
          <BadgeCartContainer />
        </IconButton>
      </Toolbar>
    </StyledAppBar>
  );
});
