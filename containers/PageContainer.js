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
import { useMemo } from 'react';

import AppBar from "../components/AppBar";
import Cart from "../components/Cart/Cart";
import LeftDrawer from "../components/LeftDrawer";
import BadgeCartContainer from "../containers/BadgeCartContainer";
import CartItemContainer from "../containers/CartItemContainer";
import { removeAllProducts } from "../src/actions/cart";
import { toggleDrawer, DRAWERS } from "../src/actions/ui";
import {
  cartTotalSelector,
  isRightDrawerOpenSelector,
  isLeftDrawerOpenSelector
} from "../src/selectors";
import CartContainer from "./CartContainer";
import RightDrawerContainer from "./RightDrawerContainer";

const leftDrawerWidth = 200;

const StyledContainer = styled(Container)`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  vertical-align: middle;
  padding-left: ${props => (props.leftOpen ? leftDrawerWidth + 5: 0)}px;
`;

const StyledMenuIcon = styled.img`
  max-height: 30px;
  max-width: 30px;
`;

const MENU_ITEMS = [
  {
    name: "Menu",
    icon: <StyledMenuIcon src="/icons/icons8-restaurant-menu-96.png" />,
    path: "/"
  },
  {
    name: "Pizza",
    icon: <StyledMenuIcon src="/icons/icons8-pizza-96.png" />,
    path: "/pizza"
  },
  {
    name: "Soups",
    icon: <StyledMenuIcon src="/icons/icons8-soup-plate-96.png" />,
    path: "/soups"
  },
  {
    name: "Drinks",
    icon: <StyledMenuIcon src="/icons/icons8-soda-bottle-96.png" />,
    path: "/drinks"
  },
  {
    name: "Desserts",
    icon: <StyledMenuIcon src="/icons/icons8-pancake-96.png" />,
    path: "/desserts"
  },
  {
    name: "Checkout",
    icon: <StyledMenuIcon src="/icons/icons8-checkout-96.png" />,
    path: "/checkout"
  }
];

export default function PageContainer({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const handleToggleRightDrawer = useCallback(
    () => void dispatch(toggleDrawer(DRAWERS.RIGHT))
  );
  const handleToggleLeftDrawer = useCallback(
    () => void dispatch(toggleDrawer(DRAWERS.LEFT))
  );
  const isLeftDrawerOpen = useSelector(isLeftDrawerOpenSelector);
  const isRightDrawerOpen = useSelector(isRightDrawerOpenSelector);
  const items = useMemo(
    () =>
      MENU_ITEMS.map(item => ({
        ...item,
        selected: router.pathname === item.path
      })),
    [router.pathname]
  );

  return (
    <>
      <AppBar
        leftMargin={isLeftDrawerOpen ? leftDrawerWidth : 0}
        rightMargin={isRightDrawerOpen ? leftDrawerWidth : 0}
        onToggleRight={handleToggleRightDrawer}
        onToggleLeft={handleToggleLeftDrawer}
        header="Pizza store"
      />
      <LeftDrawer
        open={isLeftDrawerOpen}
        items={items}
        width={leftDrawerWidth}
      />
      <StyledContainer leftOpen={isLeftDrawerOpen}>{children}</StyledContainer>
      <RightDrawerContainer>
        <CartContainer showActions />
      </RightDrawerContainer>
    </>
  );
}
