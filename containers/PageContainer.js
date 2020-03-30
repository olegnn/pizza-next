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
import { toggleDrawer } from "../src/actions/ui";
import { cartTotalSelector, isDrawerOpenSelector } from "../src/selectors";
import CartContainer from "./CartContainer";
import DrawerContainer from "./DrawerContainer";

const drawerWidth = "200px";

const StyledContainer = styled(Container)`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  vertical-align: middle;
  padding-left: 5px;
`;
// calc(${drawerWidth} + 5px);
const StyledMenuIcon = styled.img`
  max-height: 30px;
  max-width: 30px;
`;

export default function PageContainer({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const handleToggleDrawer = useCallback(() => void dispatch(toggleDrawer()));

  "/icons/icons8-soda-bottle-96.png",
    "/icons/icons8-soup-plate-96.png",
    "/icons/icons8-pancake-96.png";

  return (
    <>
      <AppBar
        marginLeft={drawerWidth}
        onToggleCart={handleToggleDrawer}
        header="Pizza store"
      />
      {null && (
        <Menu
          items={[
            {
              name: "Menu",
              icon: null,
              //onClick: () => void router.push("/"),
              path: "/"
            },
            {
              name: "Pizza",
              icon: <StyledMenuIcon src="/icons/icons8-pizza-96.png" />,
              //onClick: () => void router.push("/pizza"),
              path: "/pizza"
            },
            {
              name: "Soups",
              icon: <StyledMenuIcon src="/icons/icons8-soup-plate-96.png" />,
              //onClick: () => void router.push("/soups"),
              path: "/soups"
            },
            {
              name: "Drinks",
              icon: <StyledMenuIcon src="/icons/icons8-soda-bottle-96.png" />,
              //onClick: () => void router.push("/drinks"),
              path: "/drinks"
            },
            {
              name: "Desserts",
              icon: <StyledMenuIcon src="/icons/icons8-pancake-96.png" />,
              //onClick: () => void router.push("/desserts"),
              path: "/desserts"
            },
            {
              name: "Checkout",
              icon: <StyledMenuIcon src="/icons/icons8-checkout-96.png" />,
              //onClick: () => void router.push("/checkout"),
              path: "/checkout"
            }
          ].map(v => ({
            ...v,
            onClick: () => void 0,
            selected: router.pathname === v.path
          }))}
          width={drawerWidth}
        />
      )}
      <StyledContainer>{children}</StyledContainer>
      <DrawerContainer>
        <CartContainer />
      </DrawerContainer>
    </>
  );
}
// <a target="_blank" href="https://icons8.com/icons/set/chili-pepper">Chili Pepper icon</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
